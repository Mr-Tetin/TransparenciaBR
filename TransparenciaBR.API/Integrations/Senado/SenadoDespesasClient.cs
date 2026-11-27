using System.Net.Http;
using System.Text.Json;
using TransparenciaBR.API.Integrations.Senado.Models;

namespace TransparenciaBR.API.Integrations.Senado;

public class SenadoDespesasClient
{
    private readonly HttpClient _client;
    
    public SenadoDespesasClient(HttpClient client)
    {
        _client = client;
    }

    public async Task<List<SenadoDespesas>> GetDespesasPorSenadoEAno(int codSenador, int ano)
    {
        var resposta = await _client.GetAsync(
            $"api/v1/senadores/despesas_ceaps/{ano}"
        );

        resposta.EnsureSuccessStatusCode();
        
        var json = await resposta.Content.ReadAsStringAsync();
        
        Console.WriteLine(json.Substring(0, Math.Min(2000, json.Length)));

        var despesas = JsonSerializer.Deserialize<List<SenadoDespesas>>(json) ?? new List<SenadoDespesas>();

        var despesasDoSenador = despesas.Where(d => d.codSenador == codSenador).ToList();

        return despesasDoSenador;
    }
}