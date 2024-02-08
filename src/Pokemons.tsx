import styles from "./Pokemons.module.scss";

type PokemonsProps = {
  onPokemonNameClicked: (pokemonName: string) => void;
};

const pokemons = ["Abra", "Pikachu", "Charmander", "Ditto", "Gengar"];

export function Pokemons({ onPokemonNameClicked }: PokemonsProps) {
  return (
    <menu>
      {pokemons.map((pokemonName) => (
        <li className={styles.listItem}>
          <a
            href=""
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
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
