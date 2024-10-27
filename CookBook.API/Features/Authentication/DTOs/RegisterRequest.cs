using FluentValidation;

namespace CookBook.API.Features.Authentication.DTOs;

public record RegisterRequest(string Email, string Password, string Name);

public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator()
    {
        RuleFor(x => x.Email)
            .EmailAddress()
            .NotEmpty();

        RuleFor(x => x.Name)
            .MaximumLength(100)
            .NotEmpty();

        RuleFor(x => x.Password)
            .MinimumLength(8)
            .NotEmpty()
            .Must(x => x.Any(char.IsUpper)).WithMessage("Must contain atleast one uppercase letter.")
            .Must(x => x.Any(char.IsDigit)).WithMessage("Must contain atleast one digit.");
    }
}