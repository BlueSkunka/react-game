import {buttonVariants} from "@constants/variants/ColorVariants.ts";

export function Button(
    {
        btnWidth = 'btn-wide',
        type = 'button',
        level = 'primary',
        label = 'Missing label',
        click = () => {},
        disabled = ''
    } : {
        btnWidth: 'btn-wide' | 'btn-lg' | '' | 'btn-sm' | 'btn-xs',
        type: "button" | "submit" | "reset" | undefined,
        level: string,
        label: string,
        click: () => void,
        disabled: "btn-disabled" | ""
    }
) {
    return (
        <>
            <button onClick={click}
                    type={type}
                    className={`btn ${buttonVariants[level]} ${btnWidth} ${disabled} m-2`}>
                {label}
            </button>
        </>
    );
}