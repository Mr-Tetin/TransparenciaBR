using TransparenciaBR.API.Integrations.Camara;

var builder = WebApplication.CreateBuilder(args);

//Adiciona Serviços
builder.Services.AddControllers();
builder.Services.AddOpenApi();


builder.Services.AddHttpClient<CamaraClient>(client =>
{
    client.BaseAddress = new Uri("https://dadosabertos.camara.leg.br/api/v2/");
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
