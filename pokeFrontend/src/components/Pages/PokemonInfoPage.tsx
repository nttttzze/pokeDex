import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../App.css";
import { AbilityDesc } from "../Popup";

export function capitalizeFirstLetter(val: string) {
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
    other: {
      showdown: {
        front_default: string | null;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}
export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface AbilityInfo {
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
    };
  }[];
}

export interface SpeciesPoke {
  flavor_text_entries: FlavorTextEntry[];
}

const pokeUrl = "http://localhost:5010/api/pokemon";

export function PokemonInfoPage() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState<Poke | null>(null);
  const [species, setSpecies] = useState<SpeciesPoke | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pResponse = await fetch(`${pokeUrl}/${pokemonName}`);
        const json = await pResponse.json();
        if (!pResponse.ok) {
          throw new Error(json.message || "Fel vid hämtning.");
        }
        setPokemon(json.data.pokemon);

        const speciesRes = await fetch(json.data.pokemon.species.url);
        const speciesData = await speciesRes.json();
        setSpecies(speciesData);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  if (error) return <div>Fel: {error}</div>;
  if (!pokemon) return <div>Laddar...</div>;

  return (
    <>
      <div
        className="d-flex justify-content-center mt-5 align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div
          className="small-card"
          style={{
            // position: "absolute",
            width: "18rem",
            // height: "18.5rem",
            height: "16.9rem",
            margin: "1rem",
            marginTop: "-5.5rem",
          }}
        >
          <h4></h4>
          <div className="extra-info" style={{}}>
            <h5>
              Type:&nbsp;&nbsp;
              {pokemon!.types
                .map((t) => capitalizeFirstLetter(t.type.name))
                .join(", ")}
            </h5>
            <AbilityDesc pokemon={pokemon} />

            {pokemon.stats.map((s, i) => (
              <h5 key={i}>
                {capitalizeFirstLetter(s.stat.name)}: {s.base_stat}
              </h5>
            ))}
            <div
              className="desc"
              style={{
                borderRadius: "15px",
                background: "#c1e6e3",
                width: "18rem",
                height: "7rem",
                marginBottom: "-3rem",
                zIndex: 2,
                position: "relative",
                justifyContent: "center",
                padding: ".8rem",
                paddingLeft: "1rem",
                marginLeft: "-1rem",
                marginTop: "2.2rem", //var 2.2
              }}
            >
              {species && (
                <p>
                  {species!.flavor_text_entries
                    .find((entry) => entry.language.name === "en")
                    ?.flavor_text.replace(/\f|\n/g, " ") ??
                    "Ingen flavor text hittades"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          className="card"
          style={{
            width: "18rem",
            background: "#c1e6e3",
            margin: "1rem",
            borderRadius: "15px",
          }}
        >
          <img
            className="card-img-top"
            src={pokemon?.sprites?.other?.showdown?.front_default || undefined}
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
    </>
  );
}
