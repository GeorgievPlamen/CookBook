using CookBook.API.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CookBook.API.Data;

public class CookBookContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Cook> Cooks { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CookBookContext).Assembly);

        base.OnModelCreating(modelBuilder);
    }
}
