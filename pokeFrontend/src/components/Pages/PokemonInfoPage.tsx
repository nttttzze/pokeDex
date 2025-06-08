import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../App.css";

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
export interface Poke {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  sprites: {
    front_default: string;
    back_default: string;
  };

  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

const pokeUrl = "http://localhost:5010/api/pokemon";

export function PokemonInfoPage() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState<Poke | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`${pokeUrl}/${pokemonName}`);
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.message || "Fel vid hämtning.");
        }
        setPokemon(json.data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  if (error) return <div>Fel: {error}</div>;
  if (!pokemon) return <div>Laddar...</div>;

  return (
    <div
      className="d-flex justify-content-center mt-5 align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="small-card"
        style={{ width: "18rem", height: "17rem", margin: "1rem" }}
      >
        <h4></h4>
        <div className="extra-info">
          <h5>
            Type:&nbsp;&nbsp;
            {capitalizeFirstLetter(pokemon!.types[0].type.name)}
          </h5>
          <h5>
            Abilities:&nbsp;&nbsp;
            {capitalizeFirstLetter(pokemon!.abilities[0].ability.name)}
          </h5>

          {pokemon.stats.map((s, i) => (
            <h5 key={i}>
              {capitalizeFirstLetter(s.stat.name)}: {s.base_stat}
            </h5>
          ))}
        </div>
      </div>
      <div
        className="card"
        style={{ width: "18rem", background: "#c1e6e3", margin: "1rem" }}
      >
        <img
          className="card-img-top"
          src={pokemon!.sprites.front_default}
          alt={pokemon!.name}
        />
        <div className="card-body">
          <h5 className="card-title">
            {pokemon!.name.toUpperCase()} {"#" + pokemon!.id}
          </h5>
          <p className="card-text">
            {"Height: " + pokemon!.height * 10 + " cm"}{" "}
          </p>
          <p>{"Weight: " + pokemon!.weight / 10 + " kg"}</p>
        </div>
      </div>
    </div>
  );
}
