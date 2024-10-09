import {buttonVariants} from "@constants/variants/ColorVariants.ts";

export function ButtonJoinItem(props) {
    return (
        <>
            <button className={`btn join-item ${buttonVariants[props.level]}`}>{props.label}</button>
        </>
    );
}