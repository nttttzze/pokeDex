using pokeApi.Controllers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddHttpClient();

builder.Services.AddHttpClient<PokemonController>(client =>
{
    client.BaseAddress = new Uri("https://pokeapi.co/api/v2/");
});

var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllers();


app.Run();
