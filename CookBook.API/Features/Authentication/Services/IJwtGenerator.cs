namespace CookBook.API.Features.Authentication.Services;

public interface IJwtGenerator
{
    public string GenerateJwt(string email, string name);
}