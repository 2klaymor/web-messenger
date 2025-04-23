import {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {LanguageContext, translations} from '../utils/language';
import {ThemeContext, images} from '../utils/theme';
import useDropdownState from "../components/dropdowns";

const HeaderUser = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language];
    const {theme, handleThemeChange} = useContext(ThemeContext);

    const {dropdownStates, openDropdown, closeDropdown} = useDropdownState({
        search: false,
        profile: false,
    })

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                !event.target.closest('.search-container') &&
                !event.target.closest('.app-dropdown-menu')
            ) {
                closeDropdown('search');
            }
            if (
                !event.target.closest('.profile-container') &&
                !event.target.closest('.app-dropdown-menu')
            ) {
                closeDropdown('profile');
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <nav className="header header-user">

            <Link to="/" className="header-link">
                <img className="pe-3" src={images[theme].favicon} alt="icon"/>
                deadin.site
            </Link>

            {/* search dropdown */}
            <form className="search-container app-dropdown-container">

                <input type="search" placeholder={t.labels.search}
                       onClick={() => openDropdown('search')}/>

                <ul className={`app-dropdown-menu 
                ${dropdownStates.search ? 'app-show' : ''}`}>
                    <li><Link to='#'>kaneki ken</Link></li>
                    <li><Link to='#'>shadow friend</Link></li>
                </ul>

            </form>

            <button type="button" className="theme ms-auto" onClick={handleThemeChange}>
                <img src={images[theme].theme_logo} alt="change theme"/>
            </button>

            {/* profile dropdown */}
            <div className="profile-container app-dropdown-container">

                <div className="profile-button" onClick={() =>
                    dropdownStates.profile ? closeDropdown('profile') : openDropdown('profile')
                }>
                    <button type="button"></button>
                    <img src={images[theme].arrow} alt="down arrow"></img>
                </div>

                <ul className={`app-dropdown-menu
                ${dropdownStates.profile ? 'app-show' : ''}`}
                >
                    <li>
                        <button type="button">
                            <img src="/pfp.png" alt="pfp"></img>
                        </button>
                        <p>канеки кек</p>

                    </li>

                    <hr></hr>
                    {/*<li><Link to="#">{t.labels.my_profile}</Link></li>*/}
                    <li><Link to="#">{t.labels.settings}</Link></li>
                    <li><Link to="/">{t.labels.logout}</Link></li>
                </ul>

            </div>

        </nav>
    )
}

export default HeaderUser;