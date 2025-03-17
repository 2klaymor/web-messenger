import {Link} from 'react-router-dom';

import {useContext} from "react";
import {ThemeContext} from "../theme";
import {Images} from '../theme';

const SignIn = () => {
    const {theme, handleThemeChange} = useContext(ThemeContext);

    return (
        <div className="body-signin">

            {/* top */}
            <img className="logo-signin" src={Images[theme].logo_blur} alt="logo"/>
            <h1>sign in to deadin.site</h1>

            {/* form */}
            <div className="form-signin">

                <label htmlFor="inputLogin" className="form-label">username or email</label>
                <input type="email" className="form-control" id="inputLogin" placeholder="example@example.com"/>

                <div className="pt-3">
                    <label htmlFor="inputPassword" className="form-label">password</label>
                    <Link to="#" className="ms-auto float-end">forgot password?</Link>
                </div>
                <input className="form-control" id="inputPassword" type="password"/>

                <Link to="/home">
                    <button className="btn mt-3" type="submit">sign in</button>
                </Link>

            </div>

            <p>new to deadin.site?&nbsp;
                <Link to="/signup">create an account</Link>
            </p>

        </div>
    );
}

export default SignIn;