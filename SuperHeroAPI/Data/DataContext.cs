using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options) { }

    public DbSet<SuperHero> SuperHeroes => Set<SuperHero>();

    public DbSet<Pet> Pets => Set<Pet>();
}
