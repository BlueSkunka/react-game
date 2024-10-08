import {IconLight} from "@icons/IconLight.tsx";
import {IconDark} from "@icons/IconDark.tsx";
import {useEffect, useState} from "react";

export function ThemeToggler() {
    const [isDark, setIsDark] = useState(
        JSON.parse(localStorage.getItem('isdark'))
    );
    useEffect(() => {
        localStorage.setItem('isdark', JSON.stringify(isDark));
    }, [isDark])
    return (
        <>
            <label className="flex cursor-pointer gap-2">
                <IconLight />
                <input type="checkbox"
                       checked={isDark}
                       value="business"
                       className="toggle theme-controller"
                       onChange={() => setIsDark(!isDark)} />
                <IconDark />
            </label>
        </>
    );
}