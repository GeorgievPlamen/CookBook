using CookBook.API.Data.Models.Enums;
using FluentValidation;

namespace CookBook.API.Features.Recipes.DTOs;

public record CreateRecipeRequest(
    string Name,
    Guid[] IngredientIds,
    string Instructions,
    string TimeToPrepare,
    RecipeType Type,
    string? ImageBase64
    );

public class CreateRecipeRequestValidator : AbstractValidator<CreateRecipeRequest>
{
    public CreateRecipeRequestValidator()
    {
        RuleFor(x => x.IngredientIds)
            .NotEmpty();

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(50);

        RuleFor(x => x.TimeToPrepare)
            .NotEmpty();

        RuleFor(x => x.Type)
            .NotEmpty()
            .IsInEnum();

        RuleFor(x => x.Instructions)
            .NotEmpty()
            .MaximumLength(2000);
    }
}