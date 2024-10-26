using CookBook.API.Features.Authentication.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CookBook.API.Features.Authentication;

public class AuthenticationController(ILogger<AuthenticationController> logger) : BaseController
{
    private readonly ILogger<AuthenticationController> _logger = logger;

    [HttpPost("login")]
    public async Task<AuthResponse> LoginAsync(LoginRequest loginRequest)
    {
        _logger.LogInformation("In login");

        return new AuthResponse(loginRequest.Email, loginRequest.Password);
    }

    [HttpPost("register")]
    public async Task<AuthResponse> RegisterAsync(RegisterRequest registerRequest)
    {
        _logger.LogInformation("In Register");

        return new AuthResponse(registerRequest.Email, registerRequest.Name);
    }

    [HttpGet("me")]
    public async Task<string> CheckMeAsync()
    {
        return await Task.FromResult("Me");
    }
}