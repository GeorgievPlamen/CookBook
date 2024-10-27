namespace CookBook.API.Data.Models;

public class Cook
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public List<Recipe> Recipes { get; set; } = [];
}