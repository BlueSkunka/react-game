import mew from '@asset/mew.png'

export function ImageLogo(props) {
    return (
        <>
            <img src={mew} alt="Mew" {...props}/>
        </>
    );
}