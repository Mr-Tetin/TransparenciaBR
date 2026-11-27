using System.Text.Json.Serialization;

namespace TransparenciaBR.API.Integrations.Senado.Models;

public class SenadoDespesas
{
    [JsonPropertyName("id")]
    public int id { get; set; }
    
    [JsonPropertyName("codSenador")]
    public int codSenador { get; set; }
    
    [JsonPropertyName("nomeSenador")]
    public string? nomeSenador { get; set; }
    
    [JsonPropertyName("ano")]
    public int ano { get; set; }
    
    [JsonPropertyName("mes")]
    public int mes { get; set; }

    [JsonPropertyName("data")]
    public DateOnly data { get; set; }
    
    [JsonPropertyName("tipoDespesa")]
    public string? tipoDespesa { get; set; }
    
    [JsonPropertyName("CnpjCpf")]
    public string? CnpjCpf { get; set; }
    
    [JsonPropertyName("fornecedor")]
    public string? fornecedor { get; set; }
    
    [JsonPropertyName("documento")]
    public string? documento { get; set; }
    
    [JsonPropertyName("detalhamento")]
    public string? detalhamento { get; set; }
    
    [JsonPropertyName("valorReembolsado")]
    public decimal valorReembolsado { get; set; }
}