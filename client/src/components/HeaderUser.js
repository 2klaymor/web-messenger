import {Link} from 'react-router-dom';
import useCustomState from "../utils";


const Test = () => {

    // define states
    const {dropdownStates, handleFocus, handleBlur} = useCustomState({
        search: false,
        profile: false,
    })

    return (
        <nav className="navbar fixed-top">

            <Link to="/" className="navbar-brand link-light ms-5">
                <img className="icon-header pe-3" src="/favicon.jpg" alt="icon"/>
                deadin.site
            </Link>

            {/* search dropdown */}
            <form className="dis-dropdown m-auto">

                <input className="form-control" type="search" placeholder="search"
                       onClick={() => handleFocus('search')}
                       onBlur={() => handleBlur('search')}/>

                <ul className={`dis-dropdown-menu 
                ${dropdownStates.search ? 'dis-show' : ''}`}>
                    <li><Link to='#'>kaneki ken</Link></li>
                    <li><Link to='#'>shadow friend</Link></li>
                </ul>

            </form>

            <button type="button" className="theme btn ms-auto"></button>

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

export default Test;