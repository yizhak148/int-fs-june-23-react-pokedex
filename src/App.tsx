import { PokemonData } from "./PokemonData";
import { Pokemons } from "./Pokemons";
import "./App.scss";

function App() {
  return (
    <main>
      <h1 className="app-title">Pokedex</h1>
      <Pokemons />
      <PokemonData />
    </main>
  );
}

export default App;
