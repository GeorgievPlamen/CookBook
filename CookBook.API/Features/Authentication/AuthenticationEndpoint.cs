using CookBook.API.Common.Filters;
using CookBook.API.Features.Authentication.DTOs;

namespace CookBook.API.Features.Authentication;

public static class AuthenticationEndpoint
{
    public static void MapAuthentication(this WebApplication app)
    {
        var auth = app.MapGroup("/api/authentication");

        auth.MapGet("/me", () => "This is me!");
        auth.MapPost("/login", LoginAsync).AddEndpointFilter<ValidationFilter<LoginRequest>>();
        auth.MapPost("/register", RegisterAsync).AddEndpointFilter<ValidationFilter<RegisterRequest>>();
    }

    private static async Task<IResult> RegisterAsync(
        RegisterRequest registerRequest,
        CancellationToken cancellationToken,
        ILogger<RegisterRequest> logger)
    {
        var result = new AuthResponse(registerRequest.Email, registerRequest.Name);

        logger.LogInformation(result.ToString());

        return TypedResults.Ok(result);
    }

    public static async Task<IResult> LoginAsync(LoginRequest loginRequest, CancellationToken cancellationToken)
    {
        var result = new AuthResponse(loginRequest.Email, loginRequest.Password);

        return TypedResults.Ok(result);
    }
}