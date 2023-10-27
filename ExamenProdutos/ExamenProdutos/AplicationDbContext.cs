
using Microsoft.EntityFrameworkCore;
using ExamenProdutos.Models;
using ExamenProductos.Models;

namespace ExamenProdutos
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options): base(options)
        {


        }
        public DbSet <Producto> Producto{ get; set; }
        public DbSet<TiposProductos> TiposProductos { get; set; }
    }
}
