import {Link} from 'react-router-dom';
import {useContext} from 'react';

import {ThemeContext} from '../theme';
import useCustomState from "../utils";
import {Images} from '../theme';


const HeaderUser = () => {

    const {theme, handleThemeChange} = useContext(ThemeContext);

    // define states
    const {dropdownStates, handleFocus, handleBlur} = useCustomState({
        search: false,
        profile: false,
    })

    return (
        <nav className="user-navbar navbar fixed-top">

            <Link to="/" className="navbar-brand ms-5">
                <img className="icon-header pe-3" src={Images[theme].favicon} alt="icon"/>
                deadin.site
            </Link>

            {/* search dropdown */}
            <form className="dis-dropdown search-bar">

                <input className="form-control" type="search" placeholder="search"
                       onClick={() => handleFocus('search')}
                       onBlur={() => handleBlur('search')}/>

                <ul className={`dis-dropdown-menu 
                ${dropdownStates.search ? 'dis-show' : ''}`}>
                    <li><Link to='#'>kaneki ken</Link></li>
                    <li><Link to='#'>shadow friend</Link></li>
                </ul>

            </form>

            <button type="button" className="theme btn ms-auto" onClick={handleThemeChange}>
                <img src={Images[theme].theme_logo} alt="change theme"/>
            </button>

            {/* profile dropdown */}
            <div className="profile dis-dropdown">

                <button className="profile-button btn ms-2 me-5" type="button"
                        onMouseOver={() => handleFocus('profile')}
                        onMouseOut={() => {
                            if (!document.querySelector('.dis-dropdown-menu:hover')) {
                                handleBlur('profile');
                            }
                        }}
                >
                </button>

                <ul className={`dis-dropdown-menu
                ${dropdownStates.profile ? 'dis-show' : ''}`}
                    onMouseOver={() => handleFocus('profile')}
                    onMouseOut={() => handleBlur('profile')}
                >
                    <li><Link to="#" className="">my profile</Link></li>
                    <li><Link to="#" className="">settings</Link></li>
                    <li><Link to="/" className="">log out</Link></li>
                </ul>

            </div>

        </nav>
    );
}

export default HeaderUser;