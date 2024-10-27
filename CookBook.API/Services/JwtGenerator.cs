using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CookBook.API.Features.Authentication.Services;
using Microsoft.IdentityModel.Tokens;

namespace CookBook.API.Services;

public class JwtGenerator : IJwtGenerator
{
    public string GenerateJwt(string email, string name)
    {
        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySuperSecretKeyNeverUseLikeThis")),
            SecurityAlgorithms.HmacSha256);

        var claims = new Claim[]
        {
            new(ClaimTypes.Email, email),
            new(ClaimTypes.GivenName, name),
        };

        var securityToken = new JwtSecurityToken(
            issuer: "CookBook",
            audience: "CookBook",
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
}
