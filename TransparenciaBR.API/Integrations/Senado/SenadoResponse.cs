using System.Text.Json.Serialization;

namespace TransparenciaBR.API.Integrations.Senado;

public class SenadoListaResponse
{
    [JsonPropertyName("ListaParlamentarEmExercicio")]
    public ListaParlamentarEmExercicio? ListaParlamentarEmExercicio { get; set; }
}

public class ListaParlamentarEmExercicio
{
    [JsonPropertyName("Parlamentares")]
    public Parlamentares? Parlamentares { get; set; }
}

public class Parlamentares
{
    [JsonPropertyName("Parlamentar")]
    public List<SenadoItem>? Parlamentar { get; set; }
}

public class SenadoItem
{
    [JsonPropertyName("IdentificacaoParlamentar")]
    public IdentificacaoParlamentar? IdentificacaoParlamentar { get; set; }
    
    [JsonPropertyName("Mandato")]
    public Mandato? Mandato { get; set; }
}

public class IdentificacaoParlamentar
{
    [JsonPropertyName("CodigoParlamentar")]
    public string? CodigoParlamentar { get; set; }
    
    [JsonPropertyName("NomeParlamentar")]
    public string? NomeParlamentar { get; set; }
    
    [JsonPropertyName("SiglaPartidoParlamentar")]
    public string? SiglaPartido { get; set; }
    
    [JsonPropertyName("UfParlamentar")]
    public string? UfParlamentar { get; set; }
    
    [JsonPropertyName("EmailParlamentar")]
    public string? EmailParlamentar { get; set; }
    
    [JsonPropertyName("UrlFotoParlamentar")]
    public string? UrlFotoParlamentar { get; set; }
}

public class Mandato
{
    [JsonPropertyName("CodigoMandato")]
    public string? CodigoMandato { get; set; }
    
    [JsonPropertyName("PrimeiraLegislaturaDoMandato")]
    public PrimeiraLegislaturaDoMandato? PrimeiraLegislaturaDoMandato { get; set; }
    
    [JsonPropertyName("SegundaLegislaturaDoMandato")]
    public SegundaLegislaturaDoMandato? SegundaLegislaturaDoMandato { get; set; }
}

public class PrimeiraLegislaturaDoMandato
{
    [JsonPropertyName("DataInicio")]
    public DateOnly DataInicio { get; set; }
    
    [JsonPropertyName("DataFim")]
    public DateOnly DataFim { get; set; }
}

public class SegundaLegislaturaDoMandato
{
    [JsonPropertyName("DataInicio")]
    public DateOnly DataInicio { get; set; }
    
    [JsonPropertyName("DataFim")]
    public DateOnly DataFim { get; set; }
}