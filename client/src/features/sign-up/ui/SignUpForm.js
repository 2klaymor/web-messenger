import {useContext} from "react";
import {Link} from 'react-router-dom';
import {LanguageContext, translations} from "../../../app/contexts/languageContext";
import {ThemeContext, images} from "../../../app/contexts/themeContext";
import {useSignUp} from "../model/useSignUp";
import Button from "../../../shared/ui/Button";
import ErrorMessage from "../../../shared/ui/ErrorMessage";
import {ToggleVisibilityIcon} from "../../../widgets/password-toggle/ToggleVisibilityIcon";
import {useToggleVisibility} from "../../../widgets/password-toggle/useToggleVisibility";
// import EmailVerificationModal from "../../../features/sign-up/ui/EmailVerificationModal";

const SignUpForm = () => {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    const {
        passwordRef,
        userData, setUserData,
        errorKeys,
        // showVerification, setShowVerification,
        isDisabled, handleSubmit,
    } = useSignUp();
    const {show, toggle} = useToggleVisibility()

    return (
        <div className="signup">

            {/* row element 1 */}
            <img className="signup__logo" src={images[theme].signup_bg} alt="logo"/>

            {/* row element 2 */}
            <div className="form">

                <h1>{t.sign_up.title}</h1>
                {/* username */}
                <label htmlFor="inputUsername">{t.fields.username}</label>
                <input id="inputUsername"
                       type="text"
                       value={userData.username}
                       onChange={(e) =>
                           setUserData(prev => ({...prev, username: e.target.value}))}
                />
                <ErrorMessage errorKey={errorKeys.username}/>

                {/* email */}
                <label htmlFor="inputEmail">{t.fields.email}</label>
                <input id="inputEmail"
                       type="email"
                       placeholder="example@example.com"
                       value={userData.email}
                       onChange={(e) =>
                           setUserData(prev => ({...prev, email: e.target.value}))}
                />
                <ErrorMessage errorKey={errorKeys.email}/>

                {/* password */}
                <label htmlFor="inputPassword">{t.fields.password}</label>
                <div className="toggle-visibility-wrapper">
                    <input id="inputPassword"
                           ref={passwordRef}
                           type={show ? 'text' : 'password'}
                           value={userData.password}
                           onChange={(e) =>
                               setUserData(prev => ({...prev, password: e.target.value}))}
                    />
                    <ToggleVisibilityIcon
                        show={show}
                        onClick={toggle}
                    />
                </div>
                <ErrorMessage errorKey={errorKeys.password}/>

                <Button disabled={isDisabled} onClick={handleSubmit}>{t.buttons.continue}</Button>
                <ErrorMessage errorKey={errorKeys.submit}/>

                <div className="form__auth-link">
                    <p>{t.sign_up.existing_user_prompt}&nbsp;</p>
                    <Link to="/signin">{t.buttons.sign_in}</Link>
                </div>

            </div>

            {/*{showVerification && <EmailVerificationModal*/}
            {/*    email={userData.email}*/}
            {/*    onClose={() => setShowVerification(false)}/>}*/}
        </div>

    )
}

export default SignUpForm;