import DarkModeSwitch from "@/components/darkmodeSwitch";
import { changeDarkModeByCondition } from "@/lib/utils";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = () => { changeDarkModeByCondition() }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    return (
        <>
            <nav className="flex items-center justify-between px-4 py-8 dark:bg-element-dark shadow">
                <a className="text-lg font-extrabold" href="/">Where in the world?</a>
                <DarkModeSwitch />
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default HomeLayout;