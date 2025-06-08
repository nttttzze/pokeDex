import { useEffect, useState } from "react";
import type { Poke } from "./PokemonInfoPage";
import "../../App.css";
import "../../Pagination.css";

function PokeDex() {
  const [pokemonList, setPokemonList] = useState<Poke[]>([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5010/api/pokemon");
    const data = await response.json();
    console.log(data);

    const detailPokemon = await Promise.all(
      data.data.results.map(async (p: { name: string; url: string }) => {
        const res = await fetch(p.url);
        return await res.json();
      })
    );
    setPokemonList(detailPokemon);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <div
            key={poke.id}
            style={{
              width: "10rem",
              background: "#c1e6e3",
              borderRadius: "8px",
              padding: "0.5rem",
            }}
          >
            <h6>#{poke.id}</h6>
            <h4>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h4>
            <img src={poke.sprites.front_default} alt={poke.name} />
          </div>
        ))}
      </div>
      <div className="pag">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default PokeDex;
