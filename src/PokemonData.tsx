import axios from "axios";
import styles from "./PokemonData.module.scss";
import { useEffect, useState } from "react";

type PokemonDataProps = {
  name: string;
};

async function getPokemonData(pokemonName: string) {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
  );

  return res.data;
}

export function PokemonData({ name }: PokemonDataProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pokemonData, setPokemonData] = useState<any>(null);

  useEffect(() => {
    getPokemonData(name).then(setPokemonData);
  }, [name]);

  if (!pokemonData) {
    return (
      <article className={styles.pokemonData}>
        <h2>Loading...</h2>
      </article>
    );
  }

  return (
    <article className={styles.pokemonData}>
      <article>
        <h2>{name}</h2>
        <img
          src={pokemonData.sprites.other["official-artwork"].front_default}
          alt=""
        />
      </article>
      <article className={styles.pokemonStats}>
        <h3>Stats</h3>
        <ul>
          <li>HP: {getStat(pokemonData, "hp")}</li>
          <li>Attack: {getStat(pokemonData, "attack")}</li>
          <li>Defense: {getStat(pokemonData, "defense")}</li>
          <li>Special attack: {getStat(pokemonData, "special-attack")}</li>
          <li>Special defense: {getStat(pokemonData, "special-defense")}</li>
          <li>Speed: {getStat(pokemonData, "speed")}</li>
        </ul>
      </article>
    </article>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getStat(pokemonData: any, statName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return pokemonData.stats.find((stat: any) => stat.stat.name === statName)
    .base_stat;
}
