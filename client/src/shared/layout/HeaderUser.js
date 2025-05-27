import {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {LanguageContext, translations} from '../../app/providers/languageContext';
import {ThemeContext, images} from '../../app/providers/themeContext';
import useDropdownState from "../../widgets/dropdown/useDropdown";

const HeaderUser = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language];
    const {theme, handleThemeChange} = useContext(ThemeContext);

    const {dropdownStates, openDropdown, closeDropdown} = useDropdownState({
        search: false,
        profile: false,
    });

    useEffect(() => {
        function handleClickOutside(e) {
            if (!e.target.closest('.header-user__search-form'))
                closeDropdown('search');

            if (!e.target.closest('.header-user__profile-dropdown'))
                closeDropdown('profile');

            console.log('Dropdown state:', dropdownStates);
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <nav className="header header-user">

            <Link to="/" className="header__link">
                <img src={images[theme].favicon} alt="logo"/>
                deadin.site
            </Link>

            {/* search container */}
            <form className="header-user__search-form dropdown">

                <input type="search"
                       placeholder={t.labels.search}
                       onClick={() => openDropdown('search')}/>

                <ul className={`header-user__search-form-results dropdown__menu ${dropdownStates.search ? 'show' : ''}`}>
                    <li><Link to='#'>kaneki ken</Link></li>
                    <li><Link to='#'>shadow friend</Link></li>
                </ul>

            </form>

            <img className="header__theme"
                 src={images[theme].theme_logo}
                 onClick={handleThemeChange}
                 alt="toggle theme icon"/>

            {/* profile container */}
            <div className="header-user__profile-dropdown dropdown">

                <div className="header-user__toggle-profile-dropdown"
                     onClick={() => dropdownStates.profile ? closeDropdown('profile') : openDropdown('profile')
                }>
                    <img className="header-user__pfp"
                         src="/pfp.png"
                         alt="pfp"/>
                    <img className="header-user__arrow"
                         src={images[theme].arrow}
                         alt="down arrow"/>
                </div>

                <ul className={`header-user__profile-dropdown-menu dropdown__menu ${dropdownStates.profile ? 'show' : ''}`}>
                    <li>
                        <Link to="#">
                            <img src="/pfp.png" alt="pfp"></img>
                            <p><strong>канеки кеck</strong></p>
                            <p>@tokiogul</p>
                        </Link>
                    </li>
                <hr></hr>
                    <div className="d-column"> <li><Link to="#">{t.labels.settings}</Link></li>
                        <li><Link to="/">{t.labels.logout}</Link></li>
                    </div>
                </ul>

            </div>

        </nav>
    )
};

export default HeaderUser;