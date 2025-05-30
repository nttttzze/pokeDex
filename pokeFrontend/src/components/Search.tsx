import { useState } from "react";

function Search() {
  const [input, setInput] = useState("");

  const fetchData = (value: string) => {
    fetch(`http://localhost:5010/api/pokemon/${value}`)
      .then((response) => response.json())
      .then((json) => {
        console.log("Pokemon: ", value, json);
      });
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
