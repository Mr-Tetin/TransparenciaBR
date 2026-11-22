namespace TransparenciaBR.API.Integrations.Senado;

public class SenadoClient
{
    private readonly  HttpClient _httpClient;

    public SenadoClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<SenadoItem>> ListarSenadoresAsync()
    {
        var resposta = await _httpClient.GetFromJsonAsync<SenadoListaResponse>("senador/lista/atual.json");

        return resposta?.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar ?? new();
    }
}