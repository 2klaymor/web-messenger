import {Link} from 'react-router-dom';

import {ThemeContext} from '../theme';
import useCustomState from "../utils";
import {Images} from '../theme';
import {useContext} from "react";


const HeaderGuest = () => {

    const {theme, handleThemeChange} = useContext(ThemeContext);

    return (
        <nav className="navbar fixed-top">

            <Link to="/" className="navbar-brand ms-5">
                <img className="icon-header pe-3" src={Images[theme].favicon} alt="icon"/>
                deadin.site
            </Link>

            <button type="button" className="theme btn ms-auto" onClick={handleThemeChange}>
                <img src={Images[theme].theme_logo} alt="Logo"/>
            </button>


            <Link to="/signin">
                <button type="button" className="btn ms-2">sign in</button>
            </Link>

            <Link to="/signup">
            <button type="button" className="btn ms-2 me-5">sign up</button>
            </Link>

        </nav>
    );
}

export default HeaderGuest;