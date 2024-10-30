
using System.Security.Claims;
using CookBook.API.Common.Filters;
using CookBook.API.Data;
using CookBook.API.Data.Models;
using CookBook.API.Features.Ingredients.DTOs;
using CookBook.API.Features.Recipes.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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
        app.MapPut("/{id}", UpdateRecipeAsync);
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

    public static async Task GetRecipesAsync(
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public static async Task GetRecipesByIdAsync(
        Guid id,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public static async Task UpdateRecipeAsync(
        Guid id,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public static async Task DeleteRecipeAsync(
        Guid id,
        CookBookContext context,
        CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}