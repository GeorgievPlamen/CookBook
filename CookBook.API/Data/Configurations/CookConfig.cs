using CookBook.API.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CookBook.API.Data.Configurations;

public class CookConfig : IEntityTypeConfiguration<Cook>
{
    public void Configure(EntityTypeBuilder<Cook> builder)
    {
        builder.Property(x => x.Name)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.PassowrdHash)
            .HasMaxLength(200);

        builder.HasMany(x => x.Recipes)
            .WithOne(x => x.Cook);

        builder.Property(x => x.Email)
            .HasMaxLength(100)
            .IsRequired();
    }
}
