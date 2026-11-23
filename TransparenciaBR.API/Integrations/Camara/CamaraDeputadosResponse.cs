namespace TransparenciaBR.API.Integrations.Camara;

public class CamaraDeputadoListaResponse
{
    public List<CamaraDeputadosItem> Dados { get; set; } = new();
}

public class CamaraDeputadosItem
{
    public int id { get; set; }
    public string nome { get; set; } = "";
    public String siglaPartido { get; set; } = "";
    public String siglaUf { get; set; } = "";
    public String email { get; set; } = "";
    public String urlFoto { get; set; } = "";
}