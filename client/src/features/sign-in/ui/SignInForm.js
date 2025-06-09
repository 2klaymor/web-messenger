import {Link} from 'react-router-dom';
import {useContext} from "react";
import {LanguageContext, translations} from "../../../app/providers/languageContext";
import {images, ThemeContext} from "../../../app/providers/themeContext";
import Button from '../../../shared/ui/Button';
import ErrorMessage from '../../../shared/ui/ErrorMessage';
import useSignIn from "../model/useSignIn";
import {ToggleVisibility} from "../../../widgets/password-toggle/ToggleVisibility";

const SignInForm = () => {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    const {
        userData, setUserData,
        handleSubmit, errorKey,
    } = useSignIn();
    const {showPassword, inputRef, ToggleVisibilityIcon} = ToggleVisibility();

    return (
        <div className="signin">

            {/* top */}
            <img className="signin__logo" src={images[theme].logo_blur} alt="logo"/>
            <h1>{t.signin_welcome}</h1>

            {/* form */}
            <div className="form">

                <label htmlFor="inputLogin">{t.login}</label>
                <input type="email"
                       id="inputLogin"
                       placeholder="example@example.com"
                       value={userData.login}
                       onChange={(e) =>
                           setUserData(prev =>
                               ({...prev, login: e.target.value}))}
                />

                <div className="mt-2">
                    <label htmlFor="inputPassword">{t.password}</label>
                    <Link to="#" className="signin__forgot-password-link">{t.forgot_password}</Link>
                </div>
                <div className="toggle-visibility-wrapper">
                    <input id="inputPassword"
                           ref={inputRef}
                           type={showPassword ? 'text' : 'password'}
                           value={userData.password}
                           onChange={(e) =>
                               setUserData(prev =>
                                   ({...prev, password: e.target.value}))}
                    />
                    <ToggleVisibilityIcon/>
                </div>

                <ErrorMessage errorKey={errorKey}/>
                <Button onClick={handleSubmit}>{t.labels.signin}</Button>

            </div>

            <div className="form__auth-link">
                <p className="">{t.new_user}&nbsp;</p>
                <Link to="/signup">{t.labels.signup}</Link>
            </div>


        </div>
    )
}

export default SignInForm;