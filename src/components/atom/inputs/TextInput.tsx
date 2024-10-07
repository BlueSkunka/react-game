export function TextInput(props) {
    console.log(props.icon)
    return (
        <>
            <label className="input input-bordered flex items-center gap-2">
                {props.icon}
                <input type={props.type} placeholder={props.placeholder}  className="grow" />
            </label>
        </>
    );
}