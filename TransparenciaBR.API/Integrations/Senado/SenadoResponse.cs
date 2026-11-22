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
}