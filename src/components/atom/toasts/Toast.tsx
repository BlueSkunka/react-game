import toast from "react-hot-toast";
import {bgVariants, borderVariants} from "@constants/variants/ColorVariants.ts";

export function Toast(props) {

    return (
        <span className={`alert w-80 ${bgVariants[props.level]} border ${borderVariants[props.level]}`}
              onClick={() => toast.dismiss(props.t.id)}
        >
            <span>{props.msg}</span>
        </span>
    );
}