import { useEffect, useState, useRef } from "react";
import type { Poke } from "./PokemonInfoPage";
import "../../App.css";
import "../../pokeDexButton.css";
import { Link } from "react-router-dom";

function PokeDex() {
  const [pokemonList, setPokemonList] = useState<Poke[]>([]);
  const [pokemonPerPage] = useState(12);
  const [page, setPage] = useState(1);

  const hasFetched = useRef(false);

  const fetchData = async () => {
    if (page === 1 && hasFetched.current) {
      return;
    }
    hasFetched.current = true;

    const offset = (page - 1) * pokemonPerPage;
    const limit = pokemonPerPage;

    const response = await fetch(
      `http://localhost:5010/api/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    console.log(data);

    const detailPokemon = await Promise.all(
      data.data.results.map(async (p: { name: string; url: string }) => {
        const res = await fetch(p.url);
        return await res.json();
      })
    );
    setPokemonList((prevPokemon) => [...prevPokemon, ...detailPokemon]);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    hasFetched.current = false;
  };

  return (
    <>
      <div
        className="pokeDex"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          margin: "2rem",
          marginLeft: "2rem",
          marginRight: "2rem",
        }}
      >
        {pokemonList.map((poke) => (
          <Link
            key={poke.name}
            to={`/PokemonInfoPage/${poke.name}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="pokeDexS"
              key={poke.id}
              style={{
                width: "12rem",
                height: "14rem",
                border: "2px solid black",
                background: "#c1e6e3",
                borderRadius: "8px",
                padding: "0.5rem",
              }}
            >
              <h6>#{poke.id}</h6>
              <h4>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h4>
              <img src={poke!.sprites.front_default} alt={poke.name} />
            </div>
          </Link>
        ))}
      </div>

      <button id="loadButton" onClick={loadMore}>
        Load more Pokémon
      </button>
    </>
  );
}
export default PokeDex;
