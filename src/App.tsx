import { useState } from "react";
import { PokemonData } from "./PokemonData";
import { Pokemons } from "./Pokemons";
import "./App.scss";

function App() {
  const [currentPokemonName, setCurrentPokemonName] = useState("Abra");

  return (
    <main>
      <h1 className="app-title">Pokedex</h1>
      <Pokemons onPokemonNameClicked={setCurrentPokemonName} />
      <PokemonData name={currentPokemonName} />
    </main>
  );
}

export default App;
