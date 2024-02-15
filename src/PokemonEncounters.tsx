import axios from "axios";
import styles from "./PokemonEncounters.module.scss";
import { useAsync } from "./useAsync";
import { useCallback } from "react";

type pokemonEncounter = {
  location_area: {
    name:string
    url: string
  },
  version_details: {
    max_chance: number,
    version: {
      name:string,
      url: string
    },
    encounter_details: {
      chance: number,
      max_level: number,
      min_levl: number,
      condition_values: {
        name:string
        url: string
      }[]
    }[]
  }[]

}
async function getEncounters( name:string ) {
  const res = await axios.get< pokemonEncounter[] >(
    `https://pokeapi.co/api/v2/pokemon/${name}/encounters`
  );

  return res.data
}


type PokemonEncountersProps = { pokemonName: string; onCloseClick: () => void };

export function PokemonEncounters({
  pokemonName,
  onCloseClick,
}: PokemonEncountersProps) {
  const getCurrentPokemonEncounters = useCallback(() => getEncounters("abra"), ["abra"]);
  const { isLoading, data } = useAsync(getCurrentPokemonEncounters);
  console.log(data)
  if (isLoading) {
    return(
      <p>loading...</p>
    )
  }
  return (
    <div className={styles.wrapper}>
      <article className={styles.dialog}>
        <h2>{pokemonName} - Encounters</h2>
        <ul className={styles.gameList}>
          <li>
            <article>
              <h3>{data && data[0].version_details[0].version.name}</h3>
              <ul>
                <li className={styles.areaListItem}>
                  {data && data[0].location_area.name} ({data && data[0].version_details[0].max_chance}%)
                </li>
              </ul>
            </article>
          </li>
          <li>
            <article>
              <h3>Blue</h3>
              <ul>
                <li className={styles.areaListItem}>
                  kanto-route-13-area (5%)
                </li>
              </ul>
            </article>
          </li>
        </ul>
        <menu>
          <li>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();

                onCloseClick();
              }}
            >
              Close
            </a>
          </li>
        </menu>
      </article>
    </div>
  );
}
