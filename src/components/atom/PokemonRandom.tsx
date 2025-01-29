export function PokemonRandom() {
    const pokemons: string[] = [
        "colossinge",
        "draco",
        "grotadmorv",
        "kangourex",
        "leviator",
        "nidoqueen",
        "pikachu",
        "rhinoferos"
    ];

    const pokemon = pokemons[Math.floor(Math.random() * pokemons.length)]
    return (
        <>
            <img src={`/${pokemon}.png`} alt="Pokemon" className={'max-w-96'}/>
        </>
    );
}