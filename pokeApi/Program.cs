using pokeApi.Controllers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

builder.Services.AddControllers();

builder.Services.AddHttpClient();

// builder.Services.AddHttpClient<PokemonController>(client =>
// {
//     client.BaseAddress = new Uri("https://pokeapi.co/api/v2/");
// });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.MapControllers();


app.Run();
