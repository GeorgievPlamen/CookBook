namespace CookBook.API.Features.Recipes.DTOs;

using CookBook.API.Data.Models;

public class PagedRecipesResponse(List<Recipe> recipes, int totalCount, bool hasNextPage, bool hasPreviousPage)
{
    public List<Recipe> Recipes { get; set; } = recipes;
    public int TotalCount { get; set; } = totalCount;
    public bool HasNextPage { get; set; } = hasNextPage;
    public bool HasPreviousPage { get; set; } = hasPreviousPage;
}