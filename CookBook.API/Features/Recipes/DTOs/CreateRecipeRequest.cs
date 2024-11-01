using CookBook.API.Data.Models;
using CookBook.API.Data.Models.Enums;
using FluentValidation;

namespace CookBook.API.Features.Recipes.DTOs;

public record CreateRecipeRequest(
    string Name,
    Guid[] IngredientIds,
    string Instructions,
    TimeSpan TimeToPrepare,
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
            .NotEmpty()
            .Must(x => x.TotalSeconds > 0);

        RuleFor(x => x.Type)
            .NotEmpty()
            .IsInEnum();

        RuleFor(x => x.Instructions)
            .NotEmpty()
            .MaximumLength(2000);
    }
}