
using CookBook.API.Common.Filters;
using CookBook.API.Data;
using CookBook.API.Data.Models;
using CookBook.API.Features.Ingredients.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CookBook.API.Features.Ingredients;

public static class IngredientsEndpoint
{
    private const string Path = "api/ingredients";
    public static void MapIngredients(this WebApplication app)
    {
        var ingredients = app.MapGroup(Path).RequireAuthorization();

        ingredients.MapGet("/", GetIngredientsAsync);
        ingredients.MapGet("/{id}", GetIngredientByIdAsync).WithName("GetIngredientByIdAsync");
        ingredients.MapPost("/", CreateIngredientAsync).AddEndpointFilter<ValidationFilter<CreateIngredientRequest>>();
        ingredients.MapDelete("/{id}", DeleteIngredientAsync);
    }

    public static async Task<IResult> DeleteIngredientAsync(Guid id, CookBookContext context, CancellationToken cancellationToken)
    {
        context.Ingredients.Remove(new Ingredient { Id = id });

        await context.SaveChangesAsync(cancellationToken);

        return TypedResults.Ok();
    }

    public static async Task<IResult> CreateIngredientAsync(
        CreateIngredientRequest request,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        var ingredient = new Ingredient() { Name = request.Name };

        context.Add(ingredient);
        await context.SaveChangesAsync();

        return TypedResults.CreatedAtRoute("GetIngredientByIdAsync", new { id = ingredient.Id });
    }

    public static async Task<IResult> GetIngredientByIdAsync(Guid id, CookBookContext context, CancellationToken cancellationToken)
        => TypedResults.Ok(await context.Ingredients.FirstOrDefaultAsync(x => x.Id == id, cancellationToken));

    public static async Task<IResult> GetIngredientsAsync(CookBookContext context, CancellationToken cancellationToken)
        => TypedResults.Ok(await context.Ingredients.ToListAsync(cancellationToken));
}