using Microsoft.AspNetCore.Mvc;
using TransparenciaBR.API.Integrations.Camara;

namespace TransparenciaBR.API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class DeputadosController : ControllerBase
{
    private readonly CamaraClient _camara;

    public DeputadosController(CamaraClient camara)
    {
        _camara = camara;
    }

    [HttpGet("dados")]
    public async Task<ActionResult<List<String>>> ListarNomes()
    {
        var deputados = await _camara.ListarDeputadosAsync();
        var nomes = deputados;
        return Ok(nomes);
    }
}