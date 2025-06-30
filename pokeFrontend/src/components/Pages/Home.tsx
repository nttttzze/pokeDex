import Search from "../Search";
import "../../App.css";
// import PokeDex from "./PokeDex";

export function Home() {
  return (
    <div className="main-back">
      <div className="main-content" style={{}}>
        <h1></h1>
        <Search />
      </div>
      {/* <div className="dex" style={{ marginTop: "-1rem" }}>
        <PokeDex />
      </div> */}
    </div>
  );
}
