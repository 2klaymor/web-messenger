import {useContext} from "react";
import {Link} from 'react-router-dom';
import {LanguageContext, translations} from "../../../app/utils/languageContext";
import {images, ThemeContext} from "../../../app/utils/themeContext";
import useSignIn from "../model/useSignIn";
import Button from '../../../shared/ui/Button';
import ErrorMessage from '../../../shared/ui/ErrorMessage';
import {ToggleVisibilityIcon} from "../../../widgets/password-toggle/ToggleVisibilityIcon";
import {useToggleVisibility} from "../../../widgets/password-toggle/useToggleVisibility";

const SignInForm = () => {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    const {
        nameRef, passwordRef, handleSubmit, errorKey
    } = useSignIn();
    const { show, toggle} = useToggleVisibility(passwordRef);

    return (
        <div className="signin">

            {/* top */}
            <img className="signin__logo" src={images[theme].logo_blur} alt="logo"/>
            <h1>{t.sign_in.title}</h1>

            {/* form */}
            <div className="form">

                <label htmlFor="inputName">{t.fields.login_label}</label>
                <input
                    id="inputName"
                    name="name"
                    type="email"
                    autoComplete="username"
                    placeholder="example@example.com"
                    ref={nameRef}
                />

                <div className="mt-2">
                    <label htmlFor="inputPassword">{t.fields.password}</label>
                    <Link to="#" className="signin__forgot-password-link">{t.sign_in.forgot_password}</Link>
                </div>
                <div className="toggle-visibility-wrapper">
                    <input
                        id="inputPassword"
                        name="password"
                        type={show ? 'text' : 'password'}
                        autoComplete="current-password"
                        ref={passwordRef}
                    />
                    <ToggleVisibilityIcon
                        show={show}
                        onClick={toggle}
                    />
                </div>

                <ErrorMessage errorKey={errorKey}/>
                <Button onClick={handleSubmit}>{t.buttons.sign_in}</Button>

            </div>

            <div className="form__auth-link">
                <p className="">{t.sign_in.new_user_prompt}&nbsp;</p>
                <Link to="/signup">{t.buttons.sign_up}</Link>
            </div>

        </div>
    )
}

export default SignInForm;