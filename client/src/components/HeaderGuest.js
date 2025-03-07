import {Link} from 'react-router-dom';


const HeaderGuest = () => {
    return (
        <nav className="navbar fixed-top">

            <Link to="/" className="navbar-brand link-light ms-5">
                <img className="icon-header pe-3" src="/favicon.jpg" alt="icon"/>
                deadin.site
            </Link>

            <button type="button" className="theme btn ms-auto"></button>

            <Link to="/signin">
                <button type="button" className="btn ms-2">sign in</button>
            </Link>

            <Link to="/signup">
                <button type="button" className="btn ms-2 me-5">sign up</button>
            </Link>

        </nav>
    );
}

export default HeaderGuest;