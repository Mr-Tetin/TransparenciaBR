using System.Text.Json.Serialization;

namespace TransparenciaBR.API.Integrations.Camara;

public class RespostaDespesas
{
    [JsonPropertyName("dados")]
    public List<DespesaDeputado> Dados { get; set; }
    
    [JsonPropertyName("links")]
    public List<LinkPaginacao> Links { get; set; }
}