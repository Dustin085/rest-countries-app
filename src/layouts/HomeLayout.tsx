import DarkModeSwitch from "@/components/darkmodeSwitch";
import { changeDarkModeByCondition } from "@/lib/utils";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

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
                <Link className="text-lg font-extrabold" to="/" >Where in the world?</Link>
                <DarkModeSwitch />
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default HomeLayout;