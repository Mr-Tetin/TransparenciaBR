using System.Text.Json.Serialization;

namespace TransparenciaBR.API.Integrations.Camara;

public class LinkPaginacao
{
    [JsonPropertyName("rel")]
    public string? Rel { get; set; }
    
    [JsonPropertyName("href")]
    public string? Href { get; set; }
}