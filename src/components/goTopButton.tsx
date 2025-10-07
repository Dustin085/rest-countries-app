import { CircleChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    targetY?: number
}

function GoTopButton({ targetY = 300 }: Props) {
    const [visible, setVisible] = useState<boolean>(false);


    useEffect(() => {
        const onScroll = () => { setVisible(window.scrollY > targetY) }
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [targetY])

    const goTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <button
            onClick={goTop}
            className={`fixed bottom-6 right-6 cursor-pointer text-text dark:text-text-dark ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <CircleChevronUp size={32} />
        </button>
    );
}

export default GoTopButton;