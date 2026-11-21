namespace TransparenciaBR.API.Integrations.Camara;

public class CamaraClient
{
    private readonly HttpClient _http;

    public CamaraClient(HttpClient http)
    {
        _http = http;
    }

    public async Task<List<CamaraDeputadosItem>> ListarDeputadosAsync()
    {
        var resposta = await _http.GetFromJsonAsync<CamaraDeputadoListaResponse>("deputados");
        return resposta?.Dados ?? new();
    }
}