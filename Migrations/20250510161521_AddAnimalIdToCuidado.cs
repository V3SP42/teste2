using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZooAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddAnimalIdToCuidado : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnimalId",
                table: "Cuidados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Cuidados_AnimalId",
                table: "Cuidados",
                column: "AnimalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cuidados_Animais_AnimalId",
                table: "Cuidados",
                column: "AnimalId",
                principalTable: "Animais",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cuidados_Animais_AnimalId",
                table: "Cuidados");

            migrationBuilder.DropIndex(
                name: "IX_Cuidados_AnimalId",
                table: "Cuidados");

            migrationBuilder.DropColumn(
                name: "AnimalId",
                table: "Cuidados");
        }
    }
}
