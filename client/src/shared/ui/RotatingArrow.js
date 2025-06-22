import {useContext} from "react";
import {images, ThemeContext} from "../../app/contexts/themeContext";

export default function RotatingArrow({state}) {
    const {theme} = useContext(ThemeContext);

    return (
        <img className={`arrow ${state ? 'arrow_rotated' : ''}`}
             src={images[theme].arrow}
             alt="down arrow"/>
    )
}

