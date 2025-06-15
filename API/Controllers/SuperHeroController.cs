using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers;

[ApiController]
[Route("[controller]")]
public class SuperHeroController : GenericController<SuperHero>
{
    public SuperHeroController(DataContext context) : base(context)
    {
        
    }
}
