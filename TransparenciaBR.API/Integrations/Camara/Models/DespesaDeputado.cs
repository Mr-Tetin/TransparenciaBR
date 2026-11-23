using System.Text.Json.Serialization;

namespace TransparenciaBR.API.Integrations.Camara;

public class DespesaDeputado
{
    [JsonPropertyName("ano")]
    public int ano { get; set; }
    
    [JsonPropertyName("mes")]
    public int mes { get; set; }
    
    [JsonPropertyName("tipoDespesa")]
    public string? tipoDespesa { get; set; }
    
    [JsonPropertyName("dataDocumento")]
    public DateTime?  dataDocumento { get; set; }
    
    [JsonPropertyName("nomeFornecedor")]
    public string? nomeFornecedor { get; set; }
    
    [JsonPropertyName("valorDocumento")]
    public decimal sigla { get; set; }
    
    [JsonPropertyName("valorLiquido")]
    public decimal valorLiquido { get; set; }
    
    [JsonPropertyName("valorGlosa")]
    public decimal valorGlosa { get; set; }
}