import {useContext} from "react";
import {Link} from 'react-router-dom';

import {LanguageContext, translations} from "../../app/providers/languageContext";
import {ThemeContext, images} from "../../app/providers/themeContext";

import ErrorMessage from "../../shared/ui/ErrorMessage";
import ToggleVisibility from "../../widgets/password-toggle/ToggleVisibility";
import EmailVerificationModal from "../../features/sign-up/ui/EmailVerificationModal";

import {useSignUp} from "../../features/sign-up/model/useSignUp";

const SignUpPage = () => {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    const {
        userData, setUserData,
        errorKeys,
        showPassword, setShowPassword,
        showVerification, setShowVerification,
        handleSubmit
    } = useSignUp();

    return (
        <div className="signup">

            {/* row element 1 */}
            <img className="signup__logo" src={images[theme].logo_blur} alt="logo"/>

            {/* row element 2 */}
            <div className="form">

                <h1>{t.signup_welcome}</h1>
                {/* username */}
                <label htmlFor="inputUsername">{t.username}</label>
                <input id="inputUsername" type="text"
                       value={userData.username}
                       onChange={(e) =>
                           setUserData(prev => ({...prev, username: e.target.value}))}
                />
                <ErrorMessage errorKey={errorKeys.username}/>

                {/* email */}
                <label htmlFor="inputEmail">{t.email}</label>
                <input id="inputEmail" type="email"
                       placeholder="example@example.com"
                       value={userData.email}
                       onChange={(e) =>
                           setUserData(prev => ({...prev, email: e.target.value}))}
                />
                <ErrorMessage errorKey={errorKeys.email}/>

                {/* password */}
                <label htmlFor="inputPassword">{t.password}</label>
                <div className="toggle-visibility-input">
                    <input id="inputPassword" type={showPassword ? 'text' : 'password'}
                             value={userData.password}
                             onChange={(e) =>
                                 setUserData(prev => ({...prev, password: e.target.value}))}
                    />


                    {/*<ToggleVisibility state={showPassword}*/}
                    {/*                  setState={setShowPassword}/>*/}
                </div>
                <ErrorMessage errorKey={errorKeys.password}/>

                <button type="submit" onClick={handleSubmit}>{t.labels.continue}</button>
                <ErrorMessage errorKey={errorKeys.submit}/>

                <p>
                    {t.old_user}&nbsp;
                    <Link to="/signin">{t.labels.signin}</Link>
                </p>

            </div>

            {showVerification && <EmailVerificationModal
                email={userData.email}
                onClose={() => setShowVerification(false)}/>}
        </div>

    )
}

export default SignUpPage;