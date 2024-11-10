using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CookBook.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class CreateIndexRecipeName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Recipes_Name",
                table: "Recipes",
                column: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Recipes_Name",
                table: "Recipes");
        }
    }
}
