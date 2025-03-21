import {Link} from 'react-router-dom';
import {useContext, useEffect} from 'react';

import {LanguageContext, translations} from '../utils/language';
import {ThemeContext, images} from '../utils/theme';
import useDropdownState from "../utils/dropdowns";

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
        <nav className="user-navbar navbar fixed-top">

            <Link to="/" className="navbar-brand ms-5">
                <img className="icon-header pe-3" src={images[theme].favicon} alt="icon"/>
                deadin.site
            </Link>

            {/* search dropdown */}
            <form className="app-dropdown-container search-container">

                <input className="form-control" type="search" placeholder={t.labels.search}
                       onClick={() => openDropdown('search')}/>

                <ul className={`app-dropdown-menu 
                ${dropdownStates.search ? 'app-show' : ''}`}>
                    <li><Link to='#'>kaneki ken</Link></li>
                    <li><Link to='#'>shadow friend</Link></li>
                </ul>

            </form>

            <button type="button" className="theme btn ms-auto" onClick={handleThemeChange}>
                <img src={images[theme].theme_logo} alt="change theme"/>
            </button>

            {/* profile dropdown */}
            <div className="profile-container app-dropdown-container">

                <button className="profile-button btn ms-2 me-5" type="button"
                        onClick={() =>
                            dropdownStates.profile ? closeDropdown('profile') : openDropdown('profile')
                        }
                >
                </button>

                <ul className={`app-dropdown-menu
                ${dropdownStates.profile ? 'app-show' : ''}`}
                >
                    <li><Link to="#" className="">{t.labels.my_profile}</Link></li>
                    <li><Link to="#" className="">{t.labels.settings}</Link></li>
                    <li><Link to="/" className="">{t.labels.logout}</Link></li>
                </ul>

            </div>

        </nav>
    )
}

export default HeaderUser;