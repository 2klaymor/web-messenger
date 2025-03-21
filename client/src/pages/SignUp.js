import {Link} from 'react-router-dom';
import {useContext} from "react";

import {LanguageContext, translations} from '../utils/language';
import {ThemeContext, images} from '../utils/theme';

const SignUp = () => {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    return (
        <div className="d-flex flex-row">

            {/* row element 1 */}
            <img className="logo-signup" src={images[theme].logo_blur_stretched} alt="logo"/>

            {/* row element 2 */}
            <div className="m-auto">
                {/* column element 1 */}
                <h1>{t.signup_welcome}</h1>
                {/* column element 2 */}
                <div className="form-signup">

                    <label htmlFor="inputUsername" className="form-label">{t.username}</label>
                    <input className="form-control" id="inputUsername" type="text"/>

                    <label htmlFor="inputEmail" className="form-label">{t.email}</label>
                    <input className="form-control" id="inputEmail" type="email" placeholder="example@example.com"/>

                    <label htmlFor="inputPassword" className="form-label">{t.password}</label>
                    <input className="form-control" id="inputPassword" type="password"/>

                    <button className="btn" type="submit">{t.labels.continue}</button>

                    <p>
                        {t.old_user}&nbsp;
                        <Link to="/signin">{t.labels.signin}</Link>
                    </p>

                </div>
            </div>

        </div>

    )
}

export default SignUp;