using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HeroesAcademy.Application.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Heroes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Team = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecretIdentity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Salary = table.Column<decimal>(type: "decimal(9,2)", precision: 9, scale: 2, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Strength = table.Column<double>(type: "float", nullable: false),
                    LogoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Heroes", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Heroes",
                columns: new[] { "Id", "Description", "IsActive", "LogoUrl", "Name", "Salary", "SecretIdentity", "Strength", "Team" },
                values: new object[,]
                {
                    { 1, "Man with iron suit", false, "assets/logos/iron-man.png", "Iron Man", 0.99m, "Tony Stark", 4.2000000000000002, "Avengers" },
                    { 2, "Norse god of thunder", false, "assets/logos/thor.png", "Thor", 10.99m, "Thor Odinson", 4.5, "Avengers" },
                    { 3, "Man of steel", false, "assets/logos/superman.png", "Superman", 3500m, "Clark Kent", 5.0, "Justice League" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Heroes");
        }
    }
}
