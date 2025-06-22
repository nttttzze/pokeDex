using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace pokeApi.Controllers;

[Route("api/[controller]")]
public class AbilityController(HttpClient httpClient) : ControllerBase
{
    private readonly HttpClient _httpClient = httpClient;

    [HttpGet("{name}")]
    public async Task<ActionResult> GetAbility(string name)
    {
        try
        {

            var abilityResponse = await _httpClient.GetAsync($"https://pokeapi.co/api/v2/ability/{name.ToLower()}");
            abilityResponse.EnsureSuccessStatusCode();

            string abilityContent = await abilityResponse.Content.ReadAsStringAsync();
            var abilityJson = JsonDocument.Parse(abilityContent);

            return Ok(new { success = true, data = abilityJson });
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}
