import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {LanguageContext, translations} from '../../app/providers/languageContext';
import {ThemeContext, images} from '../../app/providers/themeContext';
import Button from "../ui/Button";

const HeaderGuest = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language];
    const { theme, handleThemeChange } = useContext(ThemeContext);
    const navigate = useNavigate();

    return (
        <nav className="header">
            <Link to="/" className="header__logo">
                <img src={images[theme].favicon} alt="logo"/>
                deadin.site
            </Link>

            <img className="header__theme"
                 src={images[theme].theme}
                 onClick={handleThemeChange}
                 alt="toggle theme"/>

            <div className="header__navigation">
                {/*временный быстрый переход на домашнюю страницу*/}
                {/*<Button onClick={() => navigate('/home')}>дом</Button>*/}
                <Button onClick={() => navigate('/signin')}>{t.labels.signin}</Button>
                <Button onClick={() => navigate('/signup')}>{t.labels.signup}</Button>
            </div>
        </nav>
    )
};

export default HeaderGuest;