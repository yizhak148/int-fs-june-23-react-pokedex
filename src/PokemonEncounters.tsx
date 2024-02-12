type PokemonEncountersProps = { pokemonName: string };

export function PokemonEncounters({ pokemonName }: PokemonEncountersProps) {
    return (
        <article>
            <h2>{pokemonName} - Encounters</h2>
            <ul>
                <li>
                    <article>
                        <h3>Red</h3>
                        <ul>
                            <li></li>
                        </ul>
                    </article>
                </li>
            </ul>
        </article>
    );
}