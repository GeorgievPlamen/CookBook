namespace CookBook.API.Features.Authentication.Interfaces;

public interface IJwtGenerator
{
    public string GenerateJwt(string email, string name);
}