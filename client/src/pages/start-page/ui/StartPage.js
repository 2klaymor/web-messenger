import {useContext, useRef, useEffect} from "react";
import {ThemeContext, images} from "../../../app/utils/themeContext";

export default function StartPage() {
    const {theme} = useContext(ThemeContext);
    const wrapperRef = useRef(null);
    const maxAngle = 12; // максимально возможный угол наклона
    const frame = useRef(null);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const handleMouseMove = (e) => {
            cancelAnimationFrame(frame.current);
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            frame.current = requestAnimationFrame(() => {
                const normX = (x / rect.width - 0.5) * 2;
                const normY = (y / rect.height - 0.5) * 2;
                const rotateY = normX * maxAngle;
                const rotateX = -normY * maxAngle;
                el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        };

        const handleMouseLeave = () => {
            cancelAnimationFrame(frame.current);
            el.style.transform = "";
        };

        el.addEventListener("mousemove", handleMouseMove, {passive: true});
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cancelAnimationFrame(frame.current);
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
            el.style.transform = "";
        };
    }, [maxAngle]);

    return (
        <div className="start-page">
            <div
                ref={wrapperRef}
                className="logo-wrapper"
            >
                <img
                    className="logo-wrapper__img"
                    src={images[theme].logo_blur}
                    alt="logo"
                />
            </div>
        </div>
    );
}