using System.Security.Claims;
using CookBook.API.Common.Filters;
using CookBook.API.Data;
using CookBook.API.Data.Models;
using CookBook.API.Features.Authentication.DTOs;
using CookBook.API.Features.Authentication.Services;
using Microsoft.EntityFrameworkCore;

namespace CookBook.API.Features.Authentication;

public static class AuthenticationEndpoint
{
    public static void MapAuthentication(this WebApplication app)
    {
        var auth = app.MapGroup("/api/authentication");

        auth.MapGet("/me", GetMeAsync).RequireAuthorization();
        auth.MapPost("/login", LoginAsync).AddEndpointFilter<ValidationFilter<LoginRequest>>();
        auth.MapPost("/register", RegisterAsync).AddEndpointFilter<ValidationFilter<RegisterRequest>>();
    }

    private static async Task<IResult> GetMeAsync(
        HttpContext httpContext,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        var emailFromClaim = httpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

        var foundUser = await context.Cooks.FirstOrDefaultAsync(x => x.Email == emailFromClaim, cancellationToken);

        if (foundUser is null) return TypedResults.NotFound();

        return TypedResults.Ok(foundUser);
    }

    private static async Task<IResult> RegisterAsync(
        RegisterRequest registerRequest,
        CookBookContext context,
        IJwtGenerator jwtGenerator,
        CancellationToken cancellationToken)
    {
        var cook = new Cook
        {
            Email = registerRequest.Email,
            Name = registerRequest.Name,
            PasswordHash = registerRequest.Password
        };

        context.Add(cook);

        await context.SaveChangesAsync(cancellationToken);

        var token = jwtGenerator.GenerateJwt(registerRequest.Email, registerRequest.Name);

        var result = new AuthResponse(registerRequest.Email, token);

        return TypedResults.Ok(result);
    }

    public static async Task<IResult> LoginAsync(
        LoginRequest loginRequest,
        CookBookContext context,
        IJwtGenerator jwtGenerator,
        CancellationToken cancellationToken)
    {

        var foundCook = await context.Cooks.FirstOrDefaultAsync(x => x.Email == loginRequest.Email, cancellationToken);

        if (foundCook is null) return TypedResults.NotFound();

        var token = jwtGenerator.GenerateJwt(foundCook.Email, foundCook.Email);

        var result = new AuthResponse(loginRequest.Email, token);

        return TypedResults.Ok(result);
    }
}