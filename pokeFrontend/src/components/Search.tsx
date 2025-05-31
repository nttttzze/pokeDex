import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");

  // const fetchData = (value: string) => {
  //   fetch(`http://localhost:5010/api/pokemon/${value}`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log("Pokemon: ", value, json);
  //     });
  // };

  const navigate = useNavigate();
  //  Ny kod, lättare att läsa + felhantering..
  const fetchData = async (value: string) => {
    const response = await fetch(`http://localhost:5010/api/pokemon/${value}`);
    if (!response.ok) {
      alert("Enter a valid Pokemon name."); //Lägg till en riktig popup framöver eller ngt
      throw new Error("Enter a valid Pokemon name.");
    }

    const json = await response.json();
    console.log("Pokemon: ", value, json);
    navigate(`/PokemonInfoPage/${value}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(input.toLowerCase());
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="search-container">
                <input
                  type="search"
                  id="pokemonSearch"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="form-control search-input"
                  placeholder="Search Pokemon..."
                ></input>
                <i className="fas fa-search search-icon"></i>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Search;
