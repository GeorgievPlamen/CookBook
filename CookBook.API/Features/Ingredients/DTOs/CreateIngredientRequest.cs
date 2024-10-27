using FluentValidation;

namespace CookBook.API.Features.Ingredients.DTOs;

public record CreateIngredientRequest(string Name);

public class CreateIngredientRequestValidator : AbstractValidator<CreateIngredientRequest>
{
    public CreateIngredientRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(100);
    }
}