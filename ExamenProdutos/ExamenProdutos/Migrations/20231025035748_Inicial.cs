using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExamenProdutos.Migrations
{
    public partial class Inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Producto",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreProducto = table.Column<string>(type: "varchar(50)", nullable: false),
                    DescripcionProducto = table.Column<string>(type: "varchar(200)", nullable: false),
                    Precio = table.Column<decimal>(type: "Decimal(18,4)", nullable: false),
                    Existencia = table.Column<int>(type: "integer", nullable: false),
                    TipoProducto_Id = table.Column<int>(type: "integer", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime", nullable: false),
                    FechaEliminado = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Producto", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Producto");
        }
    }
}
