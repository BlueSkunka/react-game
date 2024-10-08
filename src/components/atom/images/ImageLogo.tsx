import mew from './../../../assets/mew.png'

export function ImageLogo(props) {
    return (
        <>
            <img src={mew} alt="Mew" {...props}/>
        </>
    );
}