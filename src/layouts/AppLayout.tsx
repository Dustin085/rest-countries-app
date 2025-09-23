import { Outlet } from "react-router-dom";

function HomeLayout() {
    return (
        <>
            <nav className="flex items-center px-4 py-8 dark:bg-element-dark">
                <a className="text-lg font-semibold" href="/">Where in the world?</a>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default HomeLayout;