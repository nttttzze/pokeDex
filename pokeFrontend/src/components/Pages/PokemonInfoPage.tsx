import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../App.css";

interface Poke {
  id: string;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
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
      <div className="card" style={{ width: "18rem" }}>
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
