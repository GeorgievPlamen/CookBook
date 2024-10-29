namespace CookBook.API.Features.Authentication.Interfaces;

public interface IPasswordManager
{
    public string HashPassword(string password);
    public bool IsPasswordInvalid(string passwordAttempt, string passwordSaltAndHash);
}