using TransparenciaBR.API.Integrations.Camara;
using TransparenciaBR.API.Integrations.Senado;

var builder = WebApplication.CreateBuilder(args);

//Adiciona Serviços
builder.Services.AddControllers();
builder.Services.AddOpenApi();


//Deputados
builder.Services.AddHttpClient<CamaraClient>(client =>
{
    client.BaseAddress = new Uri("https://dadosabertos.camara.leg.br/api/v2/");
    client.DefaultRequestHeaders.Add("Accept", "application/json");
});

//Senadores
builder.Services.AddHttpClient<SenadoClient>(client =>
{
    client.BaseAddress = new Uri("https://legis.senado.leg.br/dadosabertos/");
    client.DefaultRequestHeaders.Add("Accept", "application/json");
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
