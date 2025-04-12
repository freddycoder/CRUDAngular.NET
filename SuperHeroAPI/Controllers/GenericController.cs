using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers;

public abstract class GenericController<T> : ControllerBase where T : class, IId
{
    private readonly DataContext _context;

    protected GenericController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<T>>> Get(CancellationToken token)
    {
        return Ok(await _context.Set<T>().ToListAsync(token));
    }

    [HttpPost]
    public async Task<ActionResult<List<SuperHero>>> Create(T entity, CancellationToken token)
    {
        if (!ModelState.IsValid) 
        {
            return BadRequest(ModelState);
        }

        await _context.Set<T>().AddAsync(entity, token);
        await _context.SaveChangesAsync(token);

        return Ok(await _context.Set<T>().ToListAsync(token));
    }

    [HttpPut]
    public async Task<ActionResult<List<T>>> Update(T entity, CancellationToken token)
    {
        var dbHero = await _context.Set<T>().FindAsync([entity.Id], token);

        if (dbHero == null)
        {
            return NotFound();
        }

        if (!ModelState.IsValid) 
        {
            return BadRequest(ModelState);
        }

        foreach (var prop in entity.GetType().GetProperties())
        {
            var value = prop.GetValue(entity);
            if (value != null)
            {
                prop.SetValue(dbHero, value);
            }
        }

        await _context.SaveChangesAsync(token);

        return Ok(await _context.Set<T>().ToListAsync(token));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<List<SuperHero>>> Delete(int id, CancellationToken token)
    {
        var dbEntity = await _context.Set<T>().FindAsync([id], token);

        if (dbEntity == null)
        {
            return NotFound();
        }

        if (!ModelState.IsValid) 
        {
            return BadRequest(ModelState);
        }

        _context.Set<T>().Remove(dbEntity);

        await _context.SaveChangesAsync(token);

        return Ok(await _context.Set<T>().ToListAsync(token));
    }
}
