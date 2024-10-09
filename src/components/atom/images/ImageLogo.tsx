import pokebattle from '@asset/pokebattle.png'

export function ImageLogo(props) {
    return (
        <>
            <img className={"w-44"} src={pokebattle} alt="PokeBattle" {...props}/>
        </>
    );
}