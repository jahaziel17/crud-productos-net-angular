using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExamenProdutos.Models
{
    public class Producto
    {
        [Key]
        public int Id { get; set; }
        
        [Required] 
        [Column(TypeName = "varchar(50)")]
        public string NombreProducto { get; set; }

        [Required]
        [Column(TypeName ="varchar(200)")]
        public string DescripcionProducto { get; set; }


        [Required]
        [Column(TypeName = "Decimal(18,4)")]
        public decimal Precio { get; set; }

        [Required]
        [Column(TypeName = "integer")]
        public int Existencia { get; set; }

        [Required]
        [Column(TypeName = "integer")]
        public int TipoProducto_Id { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime FechaRegistro { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime FechaEliminado { get; set; }
        //FechaEliminado DateTime


    }
}
