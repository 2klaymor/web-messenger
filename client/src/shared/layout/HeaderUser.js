import {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {LanguageContext, translations} from '../../app/providers/languageContext';
import {ThemeContext, images} from '../../app/providers/themeContext';
import SwitchLanguage from "../../widgets/switch-language/SwitchLanguage";
import LinkBulletPoint from "../ui/LinkBulletPoint";

const HeaderUser = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language];
    const {theme, handleThemeChange} = useContext(ThemeContext);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(e) {
            // Если клик был не по контейнеру профиля, закрываем dropdown
            if (!e.target.closest('.header-user__dropdown')) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <nav className="header header-user">

            <Link to="/" className="header__logo">
                <img src={images[theme].favicon} alt="logo"/>
                deadin.site
            </Link>

            {/* search container */}
            {/*<form className="header-user__search-form dropdown">*/}

            {/*    <input type="search"*/}
            {/*           placeholder={t.labels.search}*/}
            {/*           onClick={() => openDropdown('search')}/>*/}

            {/*    <ul className={`header-user__search-form-results dropdown__menu ${dropdownStates.search ? 'show' : ''}`}>*/}
            {/*        <li><Link to='#'>kaneki ken</Link></li>*/}
            {/*        <li><Link to='#'>shadow friend</Link></li>*/}
            {/*    </ul>*/}

            {/*</form>*/}

            <SwitchLanguage/>

            <img className="header__theme"
                 src={images[theme].theme}
                 onClick={handleThemeChange}
                 alt="toggle theme icon"/>

            {/* dropdown container */}
            <div className="header-user__dropdown dropdown">

                <div className="header-user__toggle-dropdown"
                     onClick={() => setIsOpen(prev => !prev)}
                >
                    <img className="header-user__pfp"
                         src="/pfp.png"
                         alt="pfp"/>
                    <img className={`header-user__arrow ${isOpen ? 'header-user__arrow_rotated' : ''}`}
                         src={images[theme].arrow}
                         alt="down arrow"/>
                </div>

                <ul className={`header-user__dropdown-menu dropdown__menu ${isOpen ? 'dropdown__menu_show' : ''}`}>
                    <li>
                        <img className="header-user__dropdown-menu-pfp" src="/pfp.png" alt="pfp"></img>
                        <p className="header-user__username">канеки кеck</p>
                        <p className="header-user__handle">@tokiogul</p>
                    </li>

                    <hr></hr>

                    <div className="header-user__dropdown-list-items">
                        <LinkBulletPoint to="#" imageKey="settings">{t.labels.settings}</LinkBulletPoint>
                        <LinkBulletPoint to="/" imageKey="logout">{t.labels.logout}</LinkBulletPoint>
                    </div>

                    <SwitchLanguage/>
                </ul>

            </div>

        </nav>
    )
};

export default HeaderUser;