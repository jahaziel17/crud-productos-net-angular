using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExamenProductos.Models;
using ExamenProdutos;

namespace ExamenProductos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiposProductosController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public TiposProductosController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TiposProductos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TiposProductos>>> GetTiposProductos()
        {
            return await _context.TiposProductos.ToListAsync();
        }

        // GET: api/TiposProductos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TiposProductos>> GetTiposProductos(int id)
        {
            var tiposProductos = await _context.TiposProductos.FindAsync(id);

            if (tiposProductos == null)
            {
                return NotFound();
            }

            return tiposProductos;
        }

        // PUT: api/TiposProductos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTiposProductos(int id, TiposProductos tiposProductos)
        {
            if (id != tiposProductos.Id)
            {
                return BadRequest();
            }

            _context.Entry(tiposProductos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiposProductosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TiposProductos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TiposProductos>> PostTiposProductos(TiposProductos tiposProductos)
        {
            _context.TiposProductos.Add(tiposProductos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTiposProductos", new { id = tiposProductos.Id }, tiposProductos);
        }

        // DELETE: api/TiposProductos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTiposProductos(int id)
        {
            var tiposProductos = await _context.TiposProductos.FindAsync(id);
            if (tiposProductos == null)
            {
                return NotFound();
            }

            _context.TiposProductos.Remove(tiposProductos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TiposProductosExists(int id)
        {
            return _context.TiposProductos.Any(e => e.Id == id);
        }
    }
}
