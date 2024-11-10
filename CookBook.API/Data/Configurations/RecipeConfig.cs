using CookBook.API.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CookBook.API.Data.Configurations;

public class RecipeConfig : IEntityTypeConfiguration<Recipe>
{
    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
        builder.Property(x => x.Name)
            .HasMaxLength(100)
            .IsRequired();

        builder.HasIndex(x => x.Name);

        builder.Property<byte[]>("_imageBlob")
            .HasColumnName("ImageBlob");

        builder.Property(x => x.Type)
            .IsRequired()
            .HasMaxLength(50)
            .HasConversion<string>();

        builder.Property(x => x.Instructions)
            .HasMaxLength(1000)
            .IsRequired();

        builder.Property(x => x.TimeToPrepare)
            .IsRequired();

        builder.HasMany(x => x.Ingredients)
            .WithMany(x => x.Recipes);
    }
}
