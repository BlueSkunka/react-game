import toast from "react-hot-toast";
import {bgVariants, borderVariants} from "@constants/variants/ColorVariants.ts";
import {MessageLevelEnum} from "../../../enums/MessageLevelEnum.ts";

export function Toast(
    {t, level, msg}:
    {
        t: never,
        level: MessageLevelEnum,
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
