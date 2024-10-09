export function Alert(props) {
    return (
        <>
        <div role="alert" className={"alert alert-" + props.level}>
            {props.icon}
            <span>{props.msg}</span>
        </div></>
    );
}