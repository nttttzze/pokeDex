import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { PokemonInfoPage } from "./components/Pages/PokemonInfoPage";
import { Layout } from "./Layout";
import PokeDex from "./components/Pages/PokeDex";
import { InfoPage } from "./components/Pages/InfoPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/PokemonInfoPage/:pokemonName"
            element={<PokemonInfoPage />}
          />
          <Route path="/PokeDex" element={<PokeDex />} />
          <Route path="/pokemon/:name" element={<PokemonInfoPage />} />
          <Route path="/InfoPage" element={<InfoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
