namespace CookBook.API.Data.Models;

public class Ingredient
{
    public Guid Id { get; set; }
    public List<Recipe> Recipes { get; set; } = null!;
    public string Name { get; set; } = null!;
}