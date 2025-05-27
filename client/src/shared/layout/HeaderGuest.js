import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {LanguageContext, translations} from '../../app/providers/languageContext';
import {ThemeContext, images} from '../../app/providers/themeContext';

const HeaderGuest = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language];
    const { theme, handleThemeChange } = useContext(ThemeContext);
    const navigate = useNavigate();

    return (
        <nav className="header">

            <Link to="/" className="header__link">
                <img src={images[theme].favicon} alt="logo"/>
                deadin.site
            </Link>

            <img className="header__theme"
                 src={images[theme].theme_logo}
                 onClick={handleThemeChange}
                 alt="toggle theme icon"/>

                {/*временный быстрый переход на домашнюю страницу*/}

            <div className="header-guest">
                <button onClick={() => navigate('/home')}>дом</button>
                <button onClick={() => navigate('/signin')}>{t.labels.signin}</button>
                <button className="mr-5" onClick={() => navigate('/signup')}>{t.labels.signup}</button>
            </div>

        </nav>
    )
};

export default HeaderGuest;