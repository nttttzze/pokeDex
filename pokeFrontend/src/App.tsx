import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { PokemonInfoPage } from "./components/Pages/PokemonInfoPage";
// import Search from "./components/Search";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/PokemonInfoPage/:pokemonName"
          element={<PokemonInfoPage />}
        />
      </Routes>
    </Router>
  );
}
export default App;
