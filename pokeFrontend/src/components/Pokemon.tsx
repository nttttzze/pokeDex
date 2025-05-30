import { useState, useEffect } from "react";

const pokeUrl = "http://localhost:5010/api/pokemon";

interface Poke {
  name: string;
  sprites: {
    front_default: string;
  };
}
export default function GetPokemon() {
  const [p, setP] = useState<Poke | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`${pokeUrl}/mewtwo`);
      const json = await response.json();
      setP(json.data);
    };
    fetchPokemon();
  }, []);

  return (
    <div>
      <h1>Pokemon</h1>
      {p ? <p>{p.name}</p> : <p>Laddar...</p>}
      {/* {p ? <p>{p.sprites}</p> : <p>Laddar...</p>} */}
    </div>
  );
}
