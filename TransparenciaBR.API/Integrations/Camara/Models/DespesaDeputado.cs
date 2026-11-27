using System.Text.Json.Serialization;

namespace TransparenciaBR.API.Integrations.Camara.Models;

public class DespesaDeputado
{
    [JsonPropertyName("ano")]
    public int Ano { get; set; }
    
    [JsonPropertyName("mes")]
    public int Mes { get; set; }
    
    [JsonPropertyName("tipoDespesa")]
    public string? TipoDespesa { get; set; }
    
    [JsonPropertyName("dataDocumento")]
    public DateTime?  DataDocumento { get; set; }
    
    [JsonPropertyName("urlDocumento")]
    public string? UrlDocumento { get; set; }
    
    [JsonPropertyName("numDocumento")]
    public string? NumDocumento { get; set; }
    
    [JsonPropertyName("nomeFornecedor")]
    public string? NomeFornecedor { get; set; }
    
    [JsonPropertyName("cnpjcpfFornecedor")]
    public string? CnpjCpfFornecedor { get; set; }
    
    [JsonPropertyName("valorDocumento")]
    public decimal Sigla { get; set; }
    
    [JsonPropertyName("valorLiquido")]
    public decimal ValorLiquido { get; set; }
    
    [JsonPropertyName("valorGlosa")]
    public decimal ValorGlosa { get; set; }
}