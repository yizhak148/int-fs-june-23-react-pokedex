import { MouseEventHandler, PropsWithChildren, useCallback, useState } from "react";
import axios from "axios";
import { PokemonEncounters } from "./PokemonEncounters";
import { useAsync } from "./useAsync";
import styles from "./PokemonData.module.scss";

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
  const {
    isLoading,
    pokemonData,
    isEncountersDialogOpen,
    openEncountersDialog,
    closeEncountersDialog,
  } = usePokemonData(name);

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
        <ShareButton>share</ShareButton>
        <menu>
          <li>
            <a href="" onClick={openEncountersDialog}>
              Where to find?
            </a>
          </li>
        </menu>
      </article>
      {isEncountersDialogOpen && (
        <PokemonEncounters
          pokemonName={name}
          onCloseClick={closeEncountersDialog}
        />
      )}
    </>
  );
}

function usePokemonData(name: string) {
  const getCurrentPokemonData = useCallback(() => getPokemonData(name), [name]);
  const { isLoading, data: pokemonData } = useAsync(getCurrentPokemonData);
  const [isEncountersDialogOpen, setIsEncountersDialogOpen] = useState(false);

  const openEncountersDialog: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();

    setIsEncountersDialogOpen(true);
  };

  const closeEncountersDialog = () => setIsEncountersDialogOpen(false);

  return {
    isLoading,
    pokemonData,
    isEncountersDialogOpen,
    openEncountersDialog,
    closeEncountersDialog,
  };
}

function getStat(pokemonData: PokemonData, statName: string) {
  return pokemonData.stats.find((stat) => stat.stat.name === statName)
    ?.base_stat;
}

function ShareButton({ children }: PropsWithChildren) {
  const [isShareDialogOpen, setIsShareDialogOpen] =useState(false)

  const closeShareDialog = () => setIsShareDialogOpen(false);
  const openShareDialog = () => setIsShareDialogOpen(true);

  return(
    <>
    <button onClick={openShareDialog}>share</button>
    {isShareDialogOpen && (
      <div>
      <input type="text" id="share-link" />
      <button>copy</button>
      <button onClick={closeShareDialog}>close</button>
    </div>
    )}
    </>
  )
}