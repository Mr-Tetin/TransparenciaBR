using Microsoft.AspNetCore.Mvc;
using TransparenciaBR.API.Integrations.Senado;
using TransparenciaBR.API.Integrations.Senado.Models;

namespace TransparenciaBR.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class SenadoController : ControllerBase
{
    private readonly SenadoClient _senado;
    private readonly SenadoDespesasClient _despesas;
    
    public SenadoController(SenadoClient senado,  SenadoDespesasClient despesas)
    {
        _senado = senado;
        _despesas = despesas;
    }

    [HttpGet("dados")]
    public async Task<ActionResult<List<SenadoItem>>> ListarNomes()
    {
        var senadores = await _senado.ListarSenadoresAsync();
        
        return Ok(senadores);
    }
    
    [HttpGet("{codsenador:int}/despesas/{ano:int}")]
    public async Task<ActionResult<List<SenadoDespesas>>> ListarDespesasPorSenadorEAno(int codsenador, int ano)
    {
        var despesas = await _despesas.GetDespesasPorSenadoEAno(codsenador, ano);
        
        return Ok(despesas);
    }
}