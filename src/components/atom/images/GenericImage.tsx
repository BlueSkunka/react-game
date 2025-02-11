export function GenericImage(props) {
    return (
        <>
            <img src={`/${props.image}.png`} {...props}/>
        </>
    );
}