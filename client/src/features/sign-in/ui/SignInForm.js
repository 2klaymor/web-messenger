import {Link} from 'react-router-dom';
import ErrorMessage from '../../../shared/ui/ErrorMessage';
import ToggleVisibility from "../../../widgets/password-toggle/ToggleVisibility";
import useSignIn from "../model/useSignIn";

const SignInForm = () => {
    const {
        images, t, theme,
        userData, setUserData,
        errorKey,
        showPassword, setShowPassword,
        handleSubmit,
    } = useSignIn();

    return (
        <div className="signin">

            {/* top */}
            <img className="signin__logo" src={images[theme].logo_blur} alt="logo"/>
            <h1>{t.signin_welcome}</h1>

            {/* form */}
            <div className="signin__form">

                <label htmlFor="inputLogin">{t.login}</label>
                <input type="email"
                       id="inputLogin"
                       placeholder="example@example.com"
                       value={userData.login}
                       onChange={(e) =>
                           setUserData(prev =>
                               ({...prev, login: e.target.value}))}
                />

                <div className="mt-3">
                    <label htmlFor="inputPassword">{t.password}</label>
                    <Link to="#" className="ms-auto">{t.forgot_password}</Link>
                </div>
                <div className="toggle-visibility-input">
                    <input id="inputPassword"
                           type={showPassword ? 'text' : 'password'}
                           value={userData.password}
                           onChange={(e) =>
                               setUserData(prev =>
                                   ({...prev, password: e.target.value}))}
                    />
                    <ToggleVisibility state={showPassword}
                                      setState={setShowPassword}/>
                </div>

                <ErrorMessage errorKey={errorKey}/>
                <button onClick={handleSubmit}>{t.labels.signin}</button>

            </div>

            <p>{t.new_user}&nbsp;
                <Link to="/signup">{t.labels.signup}</Link>
            </p>

        </div>
    )
}

export default SignInForm;