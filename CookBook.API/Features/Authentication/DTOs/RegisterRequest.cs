namespace CookBook.API.Features.Authentication.DTOs;

public record RegisterRequest(string Email, string Password, string Name);