using FluentValidation;

namespace CookBook.API.Features.Authentication.DTOs;

public record LoginRequest(string Email, string Password);

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Email)
            .EmailAddress()
            .NotEmpty();

        RuleFor(x => x.Password)
            .NotEmpty();
    }
}