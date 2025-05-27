import {useContext} from "react";
import {ThemeContext, images} from "../../../app/providers/themeContext";

const StartPage = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <div className="start-page">
            <img src={images[theme].logo_blur} alt="logo"/>
        </div>
    )
}

export default StartPage;