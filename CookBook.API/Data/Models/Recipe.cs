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
    private byte[]? _imageBlob;
    public string? ImageBase64 => _imageBlob != null ? $"data:image/jpeg;base64,/9j/{Convert.ToBase64String(_imageBlob)}" : null;
    public void SetImageData(string imageBase64) => _imageBlob = Convert.FromBase64String(imageBase64);
}