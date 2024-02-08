import styles from "./Pokemons.module.scss";

export function Pokemons() {
  return (
    <menu>
      <li className={styles.listItem}>
        <a href="" className={styles.link}>
          Abra
        </a>
      </li>
      <li className={styles.listItem}>
        <a href="" className={styles.link}>
          Pikachu
        </a>
      </li>
      <li className={styles.listItem}>
        <a href="" className={styles.link}>
          Charmander
        </a>
      </li>
      <li className={styles.listItem}>
        <a href="" className={styles.link}>
          Ditto
        </a>
      </li>
      <li className={styles.listItem}>
        <a href="" className={styles.link}>
          Gengar
        </a>
      </li>
    </menu>
  );
}
