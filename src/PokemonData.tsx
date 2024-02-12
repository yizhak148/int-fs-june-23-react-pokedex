import axios from "axios";
import styles from "./PokemonData.module.scss";
import { useAsync } from "./useAsync";
import { useCallback, useState } from "react";
import { PokemonEncounters } from "./PokemonEncounters";

type PokemonData = {
  sprites: { other: { "official-artwork": { front_default: string } } };
  stats: { stat: { name: string }; base_stat: number }[];
};

type PokemonDataProps = {
  name: string;
};

async function getPokemonData(pokemonName: string) {
  //   if (pokemonName === "Abra") {
  //     await new Promise((resolve) => setTimeout(resolve, 5000));
  //   }
  //   await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000));

  const res = await axios.get<PokemonData>(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
  );

  return res.data;
}

export function PokemonData({ name }: PokemonDataProps) {
  const getCurrentPokemonData = useCallback(() => getPokemonData(name), [name]);
  const { isLoading, data: pokemonData } = useAsync(getCurrentPokemonData);
  const [isEncountersDialogOpen, setIsEncountersDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <article className={styles.pokemonData}>
        <p className={styles.loadingIndicator}>Loading...</p>
      </article>
    );
  }

  return (
    <>
      <article className={styles.pokemonData}>
        <article>
          <h2>{name}</h2>
          <img
            src={pokemonData?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </article>
        <article className={styles.pokemonStats}>
          <h3>Stats</h3>
          <ul>
            <li>HP: {pokemonData && getStat(pokemonData, "hp")}</li>
            <li>Attack: {pokemonData && getStat(pokemonData, "attack")}</li>
            <li>Defense: {pokemonData && getStat(pokemonData, "defense")}</li>
            <li>
              Special attack:{" "}
              {pokemonData && getStat(pokemonData, "special-attack")}
            </li>
            <li>
              Special defense:{" "}
              {pokemonData && getStat(pokemonData, "special-defense")}
            </li>
            <li>Speed: {pokemonData && getStat(pokemonData, "speed")}</li>
          </ul>
        </article>
        <menu>
          <li>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();

                setIsEncountersDialogOpen(true);
              }}
            >
              Where to find?
            </a>
          </li>
        </menu>
      </article>
      {isEncountersDialogOpen && (
        <PokemonEncounters
          pokemonName={name}
          onCloseClick={() => setIsEncountersDialogOpen(false)}
        />
      )}
    </>
  );
}

function getStat(pokemonData: PokemonData, statName: string) {
  return pokemonData.stats.find((stat) => stat.stat.name === statName)
    ?.base_stat;
}
