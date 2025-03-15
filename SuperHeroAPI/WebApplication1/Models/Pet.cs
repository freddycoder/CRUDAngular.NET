namespace WebApplication1;

public class Pet
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Type { get; set; }

    public DateTime? Birthday { get; set; }

    public int? OwnerId { get; set; }

    public SuperHero? Owner { get; set; }
}
