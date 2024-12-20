
using System.Security.Claims;
using CookBook.API.Common.Filters;
using CookBook.API.Data;
using CookBook.API.Data.Models;
using CookBook.API.Features.Recipes.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace CookBook.API.Features.Recipes;

public static class RecipesEndpoint
{
    public static void MapRecipes(this WebApplication app)
    {
        var recipes = app.MapGroup("api/recipes").RequireAuthorization();

        recipes.MapPost("/", CreateRecipeAsync).AddEndpointFilter<ValidationFilter<CreateRecipeRequest>>();
        recipes.MapGet("/", GetRecipesAsync);
        recipes.MapGet("/{id}", GetRecipesByIdAsync).WithName("GetRecipesByIdAsync");
        recipes.MapPut("/{id}", UpdateRecipeAsync).AddEndpointFilter<ValidationFilter<CreateRecipeRequest>>();
        recipes.MapDelete("/{id}", DeleteRecipeAsync);
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

        var ingredients = await context.Ingredients
            .Where(x => request.IngredientIds.Contains(x.Id))
            .ToListAsync(cancellationToken);

        var recipe = new Recipe()
        {
            Cook = cook,
            Name = request.Name,
            Ingredients = ingredients,
            Instructions = request.Instructions,
            TimeToPrepare = TimeSpan.Parse(request.TimeToPrepare),
            Type = request.Type
        };

        if (request.ImageBase64 is not null)
            recipe.SetImageData(request.ImageBase64);

        context.Add(recipe);

        await context.SaveChangesAsync(cancellationToken);

        return TypedResults.CreatedAtRoute("GetRecipesByIdAsync", recipe);
    }

    public static async Task<IResult> GetRecipesAsync(
        int page,
        int pageSize,
        string? searchTerm,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        var query = context.Recipes.AsQueryable();

        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            query = query.Where(x => x.Name.Contains(searchTerm));
        }

        var totalCount = await context.Recipes.CountAsync(cancellationToken);

        var hasNextPage = (page * pageSize) < totalCount;
        var hasPreviousPage = page > 1;

        var response = await query
            .Include(x => x.Ingredients)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        var pageResult = new PagedRecipesResponse(
            response,
            totalCount,
            hasNextPage,
            hasPreviousPage);

        return TypedResults.Ok(pageResult);
    }

    public static async Task<IResult> GetRecipesByIdAsync(
        Guid id,
        CookBookContext context,
        CancellationToken cancellationToken)
        => TypedResults.Ok(await context.Recipes
            .Include(x => x.Ingredients)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken));

    public static async Task<IResult> UpdateRecipeAsync(
        Guid id,
        CreateRecipeRequest request,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        var recipe = await context.Recipes.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (recipe is null)
            return TypedResults.Problem(statusCode: StatusCodes.Status404NotFound);

        var ingredients = await context.Ingredients
            .Where(x => request.IngredientIds.Contains(x.Id))
            .ToListAsync(cancellationToken);

        foreach (var ingredient in ingredients)
            ingredient.Recipes.Add(recipe);

        recipe.Name = request.Name;
        recipe.Ingredients = ingredients;
        recipe.Instructions = request.Instructions;
        recipe.Type = request.Type;
        recipe.TimeToPrepare = TimeSpan.Parse(request.TimeToPrepare);

        if (request.ImageBase64 is not null)
            recipe.SetImageData(request.ImageBase64);

        context.Update(recipe);
        await context.SaveChangesAsync();

        return TypedResults.Ok(recipe);
    }

    public static async Task<IResult> DeleteRecipeAsync(
        Guid id,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        var recipe = await context.Recipes.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (recipe is not null)
        {
            context.Remove(recipe);
            await context.SaveChangesAsync();
        }

        return TypedResults.Ok();
    }
}