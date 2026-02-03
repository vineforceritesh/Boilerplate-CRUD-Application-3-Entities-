using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserCrud.Migrations
{
    /// <inheritdoc />
    public partial class addNewColumPhotoInPatient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoPath",
                table: "Patients");

            migrationBuilder.AddColumn<byte[]>(
                name: "Photo",
                table: "Patients",
                type: "varbinary(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Patients");

            migrationBuilder.AddColumn<string>(
                name: "PhotoPath",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
