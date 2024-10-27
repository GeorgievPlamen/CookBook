
using CookBook.API.Common.Filters;
using CookBook.API.Data;
using CookBook.API.Data.Models;
using CookBook.API.Features.Ingredients.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CookBook.API.Features.Ingredients;

public static class IngredientsEndpoint
{
    public static void MapIngredients(this WebApplication app)
    {
        var ingredients = app.MapGroup("api/ingredients").RequireAuthorization();

        ingredients.MapGet("/", GetIngredientsAsync).WithName("GetIngredientById");
        ingredients.MapGet("/{id}", GetIngredientByIdAsync);
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

        // TODO fix create at route location
        return TypedResults.CreatedAtRoute(routeName: "GetIngredientById", routeValues: new { id = ingredient.Id }, value: ingredient);
    }

    public static async Task<IResult> GetIngredientByIdAsync(Guid id, CookBookContext context, CancellationToken cancellationToken)
        => TypedResults.Ok(await context.Ingredients.FirstOrDefaultAsync(x => x.Id == id, cancellationToken));

    public static async Task<IResult> GetIngredientsAsync(CookBookContext context, CancellationToken cancellationToken)
        => TypedResults.Ok(await context.Ingredients.ToListAsync(cancellationToken));
}