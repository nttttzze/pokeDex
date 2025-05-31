
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace pokeApi.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PokemonController : ControllerBase
{
    private readonly HttpClient _httpClient;
    public PokemonController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet("{name}")]
    public async Task<ActionResult> GetPokemon(string name)
    {
        try
        {
            // var response = await _httpClient.GetAsync($"pokemon/{name.ToLower()}");
            var response = await _httpClient.GetAsync($"https://pokeapi.co/api/v2/pokemon/{name.ToLower()}");
            response.EnsureSuccessStatusCode();

            string content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);

            // return Content(content, "application/json");
            return Ok(new { success = true, data = json });
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}