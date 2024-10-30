
using System.Security.Claims;
using CookBook.API.Common.Filters;
using CookBook.API.Data;
using CookBook.API.Data.Models;
using CookBook.API.Features.Ingredients.DTOs;
using CookBook.API.Features.Recipes.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace CookBook.API.Features.Recipes;

public static class RecipesEndpoint
{
    public static void MapRecipes(this WebApplication app)
    {
        app.MapGroup("api/recipes").RequireAuthorization();

        app.MapPost("/", CreateRecipeAsync).AddEndpointFilter<ValidationFilter<CreateIngredientRequest>>();
        app.MapGet("/", GetRecipesAsync);
        app.MapGet("/{id}", GetRecipesByIdAsync).WithName("GetRecipesByIdAsync");
        app.MapPut("/{id}", UpdateRecipeAsync).AddEndpointFilter<ValidationFilter<CreateIngredientRequest>>();
        app.MapDelete("/{id}", DeleteRecipeAsync);
    }

    public static async Task<Results<CreatedAtRoute, ProblemHttpResult>> CreateRecipeAsync(
        CreateRecipeRequest request,
        HttpContext httpContext,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        var userEmail = httpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

        if (userEmail is null)
            return TypedResults.Problem(
                statusCode: StatusCodes.Status404NotFound,
                detail: "Email address not found");

        var cook = await context.Cooks.FirstOrDefaultAsync(x => x.Email == userEmail, cancellationToken);

        if (cook is null)
            return TypedResults.Problem(statusCode: StatusCodes.Status404NotFound);

        var recipe = new Recipe()
        {
            Cook = cook,
            Name = request.Name,
            Ingredients = [.. request.Ingredients],
            Instructions = request.Instructions,
            TimeToPrepare = request.TimeToPrepare,
            Type = request.Type
        };

        context.Add(recipe);

        await context.SaveChangesAsync(cancellationToken);

        return TypedResults.CreatedAtRoute("GetRecipesByIdAsync", recipe);
    }

    public static async Task<IResult> GetRecipesAsync(
        CookBookContext context,
        CancellationToken cancellationToken)
        => TypedResults.Ok(await context.Recipes.ToListAsync(cancellationToken));

    public static async Task<IResult> GetRecipesByIdAsync(
        Guid id,
        CookBookContext context,
        CancellationToken cancellationToken)
        => TypedResults.Ok(await context.Recipes.FirstOrDefaultAsync(x => x.Id == id, cancellationToken));

    public static async Task<IResult> UpdateRecipeAsync(
        Guid id,
        CreateRecipeRequest request,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        var recipe = await context.Recipes.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (recipe is null)
            return TypedResults.Problem(statusCode: StatusCodes.Status404NotFound);

        recipe.Name = request.Name;
        recipe.Ingredients = request.Ingredients.ToList();
        recipe.Instructions = request.Instructions;
        recipe.Type = request.Type;
        recipe.TimeToPrepare = request.TimeToPrepare;

        context.Update(recipe);

        await context.SaveChangesAsync();

        return TypedResults.Ok(recipe);
    }

    public static async Task<IResult> DeleteRecipeAsync(
        Guid id,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        var recipe = context.Recipes.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (recipe is not null)
        {
            context.Remove(recipe);
            await context.SaveChangesAsync();
        }

        return TypedResults.Ok();
    }
}