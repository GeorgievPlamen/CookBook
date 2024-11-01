using System.Text.Json.Serialization;

namespace CookBook.API.Data.Models;

public class Ingredient
{
    public Guid Id { get; set; }
    [JsonIgnore]
    public List<Recipe> Recipes { get; set; } = [];
    public string Name { get; set; } = null!;
}