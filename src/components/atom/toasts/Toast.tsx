import toast from "react-hot-toast";
import {bgVariants, borderVariants} from "@constants/variants/ColorVariants.ts";

export function Toast(
    {t, level, msg}:
    {
        t: never,
        level: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger' | 'fatal',
        msg: string
    }
) {

    return (
        <span className={`alert w-80 ${bgVariants[level]} border ${borderVariants[level]}`}
              onClick={() => toast.dismiss(t.id)}
        >
            <span>{msg}</span>
        </span>
    );
}
