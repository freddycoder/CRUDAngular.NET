using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options) { }

    public DbSet<SuperHero> SuperHeroes => Set<SuperHero>();
}
