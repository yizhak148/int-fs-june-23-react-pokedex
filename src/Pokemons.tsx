import axios from "axios";
import styles from "./Pokemons.module.scss";
import { useAsync } from "./useAsync";

async function getPokemons() {
  const res = await axios.get<{ results: { name: string }[] }>(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  return res.data.results.map(({ name }) => name);
}

type PokemonsProps = {
  onPokemonNameClicked: (pokemonName: string) => void;
};

export function Pokemons({ onPokemonNameClicked }: PokemonsProps) {
  const { isLoading, data } = useAsync(getPokemons);

  if (isLoading) {
    return (
      <menu className={styles.wrapper}>
        <p>Loading...</p>
      </menu>
    );
  }

  return (
    <menu className={styles.wrapper}>
      {data?.map((pokemonName) => (
        <li key={pokemonName} className={styles.listItem}>
          <a
            href= {`#${pokemonName}`}
            className={styles.link}
            onClick={(e) => {
              onPokemonNameClicked(pokemonName);
            }}
          >
            {pokemonName}
          </a>
        </li>
      ))}
    </menu>
  );
}
