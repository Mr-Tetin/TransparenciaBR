using Microsoft.AspNetCore.Mvc;
using TransparenciaBR.API.Integrations.Senado;

namespace TransparenciaBR.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class SenadoController : ControllerBase
{
    private readonly SenadoClient _senado;
    
    public SenadoController(SenadoClient senado)
    {
        _senado = senado;
    }

    [HttpGet("nomes")]
    public async Task<ActionResult<List<String>>> ListarNomes()
    {
        var senadores = await _senado.ListarSenadoresAsync();
        
        return Ok(senadores);
    }
}