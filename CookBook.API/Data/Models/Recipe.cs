using CookBook.API.Data.Models.Enums;

namespace CookBook.API.Data.Models;

public class Recipe
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public Cook Cook { get; set; } = null!;
    public string Instructions { get; set; } = null!;
    public List<Ingredient> Ingredients { get; set; } = [];
    public RecipeType Type { get; set; }
    public TimeSpan TimeToPrepare { get; set; }
    public byte[]? ImageData { get; set; }
}