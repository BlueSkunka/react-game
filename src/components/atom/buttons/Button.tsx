import {buttonVariants} from "@constants/variants/ColorVariants.ts";

export function Button(props) {
    return (
        <>
            <button type={props.type} className={`btn ${buttonVariants[props.level]} ${props.btnWidth} m-2`}>{props.label}</button>
        </>
    );
}

Button.defaultProps = {
    btnWidth: "btn-wide",
    type: "button",
    level: "primary"
}