import {buttonVariants} from "@constants/variants/ColorVariants.ts";

export function Button(props) {
    return (
        <>
            <button type={props.type} className={`btn ${buttonVariants[props.level]} btn-wide`}>{props.label}</button>
        </>
    );
}