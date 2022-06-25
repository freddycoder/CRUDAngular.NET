using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

namespace WebApplication1.Controllers;
[ApiController]
[Route("[controller]")]
public class SuperHeroController : ControllerBase
{
    private readonly ILogger<SuperHeroController> _logger;
    private readonly DataContext _context;

    public SuperHeroController(ILogger<SuperHeroController> logger, DataContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet(Name = "GetSuperHeroes")]
    public async Task<ActionResult<IEnumerable<SuperHero>>> GetSuperHeroes()
    {
        return Ok(await _context.SuperHeroes.ToListAsync());
    }

    [HttpPost]
    public async Task<ActionResult<List<SuperHero>>> CreateSuperHero(SuperHero hero)
    {
        _context.SuperHeroes.Add(hero);
        await _context.SaveChangesAsync();

        return Ok(await _context.SuperHeroes.ToListAsync());
    }

    [HttpPut]
    public async Task<ActionResult<List<SuperHero>>> UpdateSuperHero(SuperHero hero)
    {
        var dbHero = await _context.SuperHeroes.FindAsync(hero.Id);

        if (dbHero == null)
        {
            return BadRequest("Hero not found.");
        }

        dbHero.Name = hero.Name;
        dbHero.FirstName = hero.FirstName;
        dbHero.LastName = hero.LastName;
        dbHero.Place = hero.Place;

        await _context.SaveChangesAsync();

        return Ok(await _context.SuperHeroes.ToListAsync());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<List<SuperHero>>> DeleteSuperHero(int id)
    {
        var dbHero = await _context.SuperHeroes.FindAsync(id);

        if (dbHero == null)
        {
            return BadRequest("Hero not found.");
        }

        _context.SuperHeroes.Remove(dbHero);

        await _context.SaveChangesAsync();

        return Ok(await _context.SuperHeroes.ToListAsync());
    }
}
