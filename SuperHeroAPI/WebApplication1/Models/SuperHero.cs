namespace WebApplication1.Models;

public class SuperHero : IId
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Place { get; set; }

    public List<Pet>? Pets { get; set; }
}
