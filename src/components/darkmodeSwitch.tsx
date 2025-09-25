import { getIsDarkMode, toggleDarkMode } from "@/lib/utils";
import { Button } from "./ui/button";
import { Moon, SunDim } from "lucide-react";
import { useEffect, useState } from "react";

function DarkModeSwitch() {
    const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode())

    const handleToggle = () => {
        setIsDarkMode(toggleDarkMode())
    }

    // 使用者切換裝置設定時根據情況更新isDarkMode
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = () => { setIsDarkMode(getIsDarkMode()) }
        mediaQuery.addEventListener("change", handleChange)

        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    return (
        <Button className="font-extrabold text-text dark:text-text-dark" variant="ghost" onClick={handleToggle}>
            {isDarkMode ?
                <><SunDim />Light Mode</> :
                <><Moon />Dark Mode</>}
        </Button>
    );
}

export default DarkModeSwitch;