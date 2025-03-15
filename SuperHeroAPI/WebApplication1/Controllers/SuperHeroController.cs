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
    public async Task<ActionResult<IEnumerable<SuperHero>>> GetSuperHeroes(CancellationToken token)
    {
        return Ok(await _context.SuperHeroes.ToListAsync(token));
    }

    [HttpPost]
    public async Task<ActionResult<List<SuperHero>>> CreateSuperHero(SuperHero hero, CancellationToken token)
    {
        _context.SuperHeroes.Add(hero);
        await _context.SaveChangesAsync(token);

        return Ok(await _context.SuperHeroes.ToListAsync(token));
    }

    [HttpPut]
    public async Task<ActionResult<List<SuperHero>>> UpdateSuperHero(SuperHero hero, CancellationToken token)
    {
        var dbHero = await _context.SuperHeroes.FindAsync([hero.Id], token);

        if (dbHero == null)
        {
            return BadRequest("Hero not found.");
        }

        dbHero.Name = hero.Name;
        dbHero.FirstName = hero.FirstName;
        dbHero.LastName = hero.LastName;
        dbHero.Place = hero.Place;

        await _context.SaveChangesAsync(token);

        return Ok(await _context.SuperHeroes.ToListAsync(token));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<List<SuperHero>>> DeleteSuperHero(int id, CancellationToken token)
    {
        var dbHero = await _context.SuperHeroes.FindAsync([id], token);

        if (dbHero == null)
        {
            return BadRequest("Hero not found.");
        }

        _context.SuperHeroes.Remove(dbHero);

        await _context.SaveChangesAsync(token);

        return Ok(await _context.SuperHeroes.ToListAsync(token));
    }
}
