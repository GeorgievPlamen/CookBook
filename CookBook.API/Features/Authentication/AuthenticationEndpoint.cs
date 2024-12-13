using System.Security.Claims;
using CookBook.API.Common.Filters;
using CookBook.API.Data;
using CookBook.API.Data.Models;
using CookBook.API.Features.Authentication.DTOs;
using CookBook.API.Features.Authentication.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
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

    public static async Task<Results<Ok<Cook>, ProblemHttpResult>> GetMeAsync(
        HttpContext httpContext,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        var emailFromClaim = httpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

        var foundUser = await context.Cooks.FirstOrDefaultAsync(x => x.Email == emailFromClaim, cancellationToken);

        if (foundUser is null)
            return TypedResults.Problem(statusCode: StatusCodes.Status404NotFound);

        return TypedResults.Ok(foundUser);
    }

    public static async Task<Results<Ok<AuthResponse>, ProblemHttpResult>> RegisterAsync(
        RegisterRequest registerRequest,
        CookBookContext context,
        IJwtGenerator jwtGenerator,
        IPasswordManager passwordManager,
        CancellationToken cancellationToken)
    {
        var alreadyRegisteredUser = await context.Cooks
            .FirstOrDefaultAsync(x => x.Email == registerRequest.Email, cancellationToken);

        if (alreadyRegisteredUser is not null)
            return TypedResults.Problem(
                statusCode: StatusCodes.Status400BadRequest,
                detail: $"Already registered with email: '{registerRequest.Email}'.");

        var cook = new Cook
        {
            Email = registerRequest.Email,
            Name = registerRequest.Name,
            PasswordHash = passwordManager.HashPassword(registerRequest.Password)
        };

        context.Add(cook);

        await context.SaveChangesAsync(cancellationToken);

        var token = jwtGenerator.GenerateJwt(registerRequest.Email, registerRequest.Name);

        var result = new AuthResponse(registerRequest.Email, token);

        return TypedResults.Ok(result);
    }

    public static async Task<Results<Ok<AuthResponse>, ProblemHttpResult>> LoginAsync(
        LoginRequest loginRequest,
        CookBookContext context,
        IJwtGenerator jwtGenerator,
        IPasswordManager passwordManager,
        CancellationToken cancellationToken)
    {

        var foundCook = await context.Cooks
            .FirstOrDefaultAsync(x => x.Email.ToLower() == loginRequest.Email.ToLower(), cancellationToken);

        if (foundCook is null ||
            passwordManager.IsPasswordInvalid(loginRequest.Password, foundCook.PasswordHash))
        {
            return TypedResults.Problem(
                statusCode: StatusCodes.Status404NotFound,
                detail: $"Password is wrong or no user with email: '{loginRequest.Email}' found.");
        }

        var token = jwtGenerator.GenerateJwt(foundCook.Email, foundCook.Email);

        var result = new AuthResponse(loginRequest.Email, token);

        return TypedResults.Ok(result);
    }
}