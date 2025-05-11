using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZooAPI.Data;
using ZooAPI.Models;

namespace ZooAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CuidadoController : ControllerBase
    {
        private readonly ZooContext _context;

        public CuidadoController(ZooContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cuidado>>> GetCuidados()
        {
            return await _context.Cuidados.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cuidado>> GetCuidado(int id)
        {
            var cuidado = await _context.Cuidados.FindAsync(id);

            if (cuidado == null)
                return NotFound();

            return cuidado;
        }

        [HttpPost]
        public async Task<ActionResult<Cuidado>> PostCuidado([FromBody] Cuidado cuidado)
        
        {
            try
            {
                Console.WriteLine($"🔍 Tentando salvar cuidado: {cuidado.Nome}, AnimalId: {cuidado.AnimalId}");

                var animalExiste = await _context.Animais.AnyAsync(a => a.Id == cuidado.AnimalId);
                if (!animalExiste)
                {
                    Console.WriteLine("❌ AnimalId inválido!");
                    return BadRequest("AnimalId inválido. Nenhum animal com esse ID foi encontrado.");
                }

                _context.Cuidados.Add(cuidado);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetCuidado), new { id = cuidado.Id }, cuidado);
            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ ERRO AO CADASTRAR CUIDADO:");
                Console.WriteLine(ex.Message);
                return BadRequest($"Erro ao salvar cuidado: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCuidado(int id, Cuidado cuidado)
        {
            if (id != cuidado.Id)
                return BadRequest();

            _context.Entry(cuidado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cuidados.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCuidado(int id)
        {
            var cuidado = await _context.Cuidados.FindAsync(id);

            if (cuidado == null)
                return NotFound();

            _context.Cuidados.Remove(cuidado);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("poranimal/{animalId}")]
        public async Task<ActionResult<IEnumerable<Cuidado>>> GetCuidadosPorAnimal(int animalId)
        {
            var cuidados = await _context.Cuidados
                .Where(c => c.AnimalId == animalId)
                .ToListAsync();

            return cuidados;
        }
    }
}