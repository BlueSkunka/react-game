export function Button(props) {
    return (
        <>
            <button type={props.type} className="btn btn-primary btn-wide">{props.label}</button>
        </>
    );
}