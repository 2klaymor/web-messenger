import {useContext} from "react";
import {ThemeContext, images} from "../utils/theme";

const Start = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <div className="start-container">
            <img src={images[theme].logo_blur} alt="logo"/>
        </div>
    )
}

export default Start;