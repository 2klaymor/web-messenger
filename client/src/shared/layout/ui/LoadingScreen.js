import {useContext} from "react";
import {images, ThemeContext} from "../../../app/contexts/themeContext";

export function LoadingScreen() {
    const {theme} = useContext(ThemeContext);

    return (
        <div className="loading-screen">
            <img src={images[theme].favicon} alt="logo"/>
        </div>
    );
}