import {useContext} from "react";
import {Link} from 'react-router-dom';

import {LanguageContext, translations} from '../utils/language';
import {ThemeContext, images} from '../utils/theme';

const SignIn = () => {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    return (
        <div className="body-signin">

            {/* top */}
            <img className="logo-signin" src={images[theme].logo_blur} alt="logo"/>
            <h1>{t.signin_welcome}</h1>

            {/* form */}
            <div className="form-signin">

                <label htmlFor="inputLogin" className="form-label">{t.username_email}</label>
                <input type="email" className="form-control" id="inputLogin" placeholder="example@example.com"/>

                <div className="pt-3">
                    <label htmlFor="inputPassword" className="form-label">{t.password}</label>
                    <Link to="#" className="ms-auto float-end">{t.forgot_password}</Link>
                </div>
                <input className="form-control" id="inputPassword" type="password"/>

                <Link to="/home">
                    <button className="btn mt-3" type="submit">{t.labels.signin}</button>
                </Link>

            </div>

            <p>{t.new_user}&nbsp;
                <Link to="/signup">{t.create_account}</Link>
            </p>

        </div>
    )
}

export default SignIn;