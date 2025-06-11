import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {LanguageContext, translations} from '../../../app/utils/languageContext';
import {ThemeContext, images} from '../../../app/utils/themeContext';
import useHeaderUser from "../model/useHeaderUser";
import SwitchLanguage from "../../../widgets/switch-language/SwitchLanguage";
import BulletPoint from "../../ui/BulletPoint";

const HeaderUser = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language];
    const {theme, handleThemeChange} = useContext(ThemeContext)

    const {isOpen, setIsOpen, handleLogout} = useHeaderUser();

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
                        <Link to="/home">
                            <img className="header-user__dropdown-menu-pfp" src="/pfp.png" alt="pfp"></img>
                            <p className="header-user__username">канеки кеck</p>
                            <p className="header-user__handle">@tokiogul</p>
                        </Link>
                    </li>

                    <hr></hr>

                    <div className="header-user__dropdown-list-items">
                        <BulletPoint to="#" wrap="link" imageKey="settings">{t.home.profile.settings}</BulletPoint>
                        <BulletPoint to="/" onClick={handleLogout} imageKey="logout">{t.home.profile.log_out}</BulletPoint>
                    </div>

                    <SwitchLanguage/>
                </ul>

            </div>

        </nav>
    )
};

export default HeaderUser;