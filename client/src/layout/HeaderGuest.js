import {Link} from 'react-router-dom';
import {useContext} from 'react';

import {LanguageContext, translations} from '../utils/language';
import {ThemeContext, images} from '../utils/theme';

const HeaderGuest = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language];
    const { theme, handleThemeChange } = useContext(ThemeContext);

    return (
        <nav className="navbar fixed-top">

            <Link to="/" className="navbar-brand ms-5">
                <img className="icon-header pe-3" src={images[theme].favicon} alt="icon"/>
                deadin.site
            </Link>

            <button type="button" className="theme btn ms-auto" onClick={handleThemeChange}>
                <img src={images[theme].theme_logo} alt="Logo"/>
            </button>


            <Link to="/signin">
                <button type="button" className="btn ms-2">{t.labels.signin}</button>
            </Link>

            <Link to="/signup">
            <button type="button" className="btn ms-2 me-5">{t.labels.signup}</button>
            </Link>

        </nav>
    )
}

export default HeaderGuest;