import {useContext} from "react";
import {ThemeContext} from "../theme";
import {Images} from '../theme';

const Start = () => {
    const {theme, handleThemeChange} = useContext(ThemeContext);

    return (
        <div className="body-start">
            <img className="logo-start" src={Images[theme].logo_blur} alt="logo"/>
        </div>
    );
};

export default Start;