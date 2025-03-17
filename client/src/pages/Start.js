import {useContext} from "react";

import {ThemeContext, images} from "../utils/theme";

const Start = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <div className="body-start">
            <img className="logo-start" src={images[theme].logo_blur} alt="logo"/>
        </div>
    )
}

export default Start;