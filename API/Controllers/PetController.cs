using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers;

[ApiController]
[Route("[controller]")]
public class PetController : GenericController<Pet>
{
    public PetController(DataContext context) : base(context)
    {
        
    }
}
