using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace ExamenProductos.Models
{
    public class TiposProductos
    {

        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string nombreTipoProducto { get; set; }

        [Required]
        [Column(TypeName = "varchar(200)")]
        public string descripcionTipoProducto { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime FechaRegistro { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime FechaEliminado { get; set; }
    }
}
