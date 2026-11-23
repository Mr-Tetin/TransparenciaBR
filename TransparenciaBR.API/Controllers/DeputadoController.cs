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

    [HttpGet("{idDeputado}/despesas")]
    public async Task<IActionResult> ListarDespesas(int idDeputado, [FromQuery] int ano = 2024, [FromQuery] int pagina = 1)
    {
        var despesas = await _camara.ListarDespesasDeputadosAsync(idDeputado, ano, pagina);
        
        return Ok(despesas);
    }
}