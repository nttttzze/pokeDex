
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
            var pokeResponse = await _httpClient.GetAsync($"https://pokeapi.co/api/v2/pokemon/{name.ToLower()}");
            pokeResponse.EnsureSuccessStatusCode();
            var pokeContent = await pokeResponse.Content.ReadAsStringAsync();
            var pokeJson = JsonDocument.Parse(pokeContent);


            var speciesResponse = await _httpClient.GetAsync($"https://pokeapi.co/api/v2/pokemon-species/{name.ToLower()}");
            speciesResponse.EnsureSuccessStatusCode();
            var speciesContent = await speciesResponse.Content.ReadAsStringAsync();
            var speciesJson = JsonDocument.Parse(speciesContent);

            return Ok(new
            {
                success = true,
                data = new
                {
                    pokemon = pokeJson.RootElement,
                    species = speciesJson.RootElement
                }
            });
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    [HttpGet()]
    public async Task<ActionResult> GetAllPokemon([FromQuery] int limit = 12, [FromQuery] int offset = 0)
    {
        try
        {
            var pokeApiUrl = $"https://pokeapi.co/api/v2/pokemon/?limit={limit}&offset={offset}";

            var response = await _httpClient.GetAsync(pokeApiUrl);
            response.EnsureSuccessStatusCode();

            string content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);
            return Ok(new { success = true, data = json });
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}