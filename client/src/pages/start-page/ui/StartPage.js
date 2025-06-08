import  {useContext, useRef, useState} from "react";
import {ThemeContext, images} from "../../../app/providers/themeContext";

export default function StartPage() {
    const {theme} = useContext(ThemeContext);
    const wrapperRef = useRef(null);

    const [tilt, setTilt] = useState({rotateX: 0, rotateY: 0});
    const maxAngle = 12; // максимально возможный угол наклона

    function updateTiltByCoords(x, y, width, height) {
        const normX = (x / width - 0.5) * 2;
        const normY = (y / height - 0.5) * 2;

        const rotateY = normX * maxAngle;
        const rotateX = -normY * maxAngle;

        setTilt({rotateX, rotateY});
    }

    function handleMouseMove(e) {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        updateTiltByCoords(x, y, rect.width, rect.height);
    }

    return (
        <div className="start-page">
            <div
                className="logo-wrapper"
                ref={wrapperRef}
                onMouseMove={handleMouseMove}
                style={{
                    transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
                }}
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