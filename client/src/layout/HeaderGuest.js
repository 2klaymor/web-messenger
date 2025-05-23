import {useContext} from 'react';
import {Link} from 'react-router-dom';

import {LanguageContext, translations} from '../utils/language';
import {ThemeContext, images} from '../utils/theme';

const HeaderGuest = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language];
    const { theme, handleThemeChange } = useContext(ThemeContext);

    return (
        <nav className="header header-guest">

            <Link to="/" className="header-link ps-5">
                <img className="pe-3" src={images[theme].favicon} alt="icon"/>
                deadin.site
            </Link>

            <button type="button" className="theme ms-auto" onClick={handleThemeChange}>
                <img src={images[theme].theme_logo} alt="logo"/>
            </button>

            <Link to="/signin">
                <button type="button" className="ms-2">{t.labels.signin}</button>
            </Link>

            <Link to="/signup">
                <button type="button" className="ms-2 me-5">{t.labels.signup}</button>
            </Link>

        </nav>
    )
}

export default HeaderGuest;