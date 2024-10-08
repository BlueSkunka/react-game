import toast from "react-hot-toast";

export function Toast(props) {
    return (
        <span className={"alert w-80 bg-" + props.level + "border border-" + props.level}
              onClick={() => toast.dismiss(props.t.id)}
        >
            <span>{props.msg}</span>
        </span>
    );
}