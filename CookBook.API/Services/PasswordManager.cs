using System.Security.Cryptography;
using CookBook.API.Features.Authentication.Interfaces;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace CookBook.API.Services;

public class PasswordManager : IPasswordManager
{
    public string HashPassword(string password)
    {
        var salt = new byte[16];

        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(salt);

        var base64password = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 16));

        var base64salt = Convert.ToBase64String(salt);

        return $"{base64salt}.{base64password}";
    }

    public bool IsPasswordValid(string passwordAttempt, string passwordSaltAndHash)
    {
        var parts = passwordSaltAndHash.Split('.');

        if (parts.Length != 2)
        {
            return false;
        }

        byte[] salt = Convert.FromBase64String(parts[0]);
        string passwordHash = parts[1];

        string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: passwordAttempt,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 16));

        return hashedPassword == passwordHash;
    }
}
