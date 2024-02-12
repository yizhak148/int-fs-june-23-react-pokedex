import styles from "./PokemonEncounters.module.scss";

type PokemonEncountersProps = { pokemonName: string };

export function PokemonEncounters({ pokemonName }: PokemonEncountersProps) {
  return (
    <div className={styles.wrapper}>
      <article className={styles.dialog}>
        <h2>{pokemonName} - Encounters</h2>
        <ul className={styles.gameList}>
          <li>
            <article>
              <h3>Red</h3>
              <ul>
                <li className={styles.areaListItem}>
                  kanto-route-13-area (5%)
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
            <a href="">Close</a>
          </li>
        </menu>
      </article>
    </div>
  );
}
