import {useContext} from "react";
import {Link} from 'react-router-dom';
import {LanguageContext, translations} from "../../../app/contexts/languageContext";
import useSignIn from "../model/useSignIn";
import Button from '../../../shared/ui/Button';
import ErrorMessage from '../../../shared/ui/ErrorMessage';
import {ToggleVisibilityIcon} from "../../../widgets/password-toggle/ToggleVisibilityIcon";
import {useToggleVisibility} from "../../../widgets/password-toggle/useToggleVisibility";

const SignInForm = () => {
    const {language} = useContext(LanguageContext);
    const t = translations[language];

    const {
        nameRef, passwordRef, handleSubmit, errorKey
    } = useSignIn();
    const { show, toggle} = useToggleVisibility(passwordRef);

    return (
        <div className="form">

            <label htmlFor="inputName">{t.fields.username}
                <input
                    id="inputName"
                    name="name"
                    type="email"
                    autoComplete="username"
                    placeholder="example@example.com"
                    ref={nameRef}
                />
            </label>

            <label htmlFor="inputPassword">{t.fields.password}
                {/*<Link to="#" className="signin__forgot-password-link">{t.sign_in.forgot_password}</Link>*/}

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
            </label>

            <ErrorMessage errorKey={errorKey}/>
            <Button onClick={handleSubmit}>{t.buttons.sign_in}</Button>

        </div>
    )
}

export default SignInForm;