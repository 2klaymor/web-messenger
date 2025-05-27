import {useState, useContext} from "react";
import {Link, useNavigate} from 'react-router-dom';

import {LanguageContext, translations} from '../../../app/providers/languageContext';
import {ThemeContext, images} from '../../../app/providers/themeContext';

import ErrorMessage from '../../../shared/ui/ErrorMessage';
import ToggleVisibility from "../../../widgets/password-toggle/ToggleVisibility";

import {handleSignIn} from "../../../features/sign-up/model/authHandler";

const SignInPage = () => {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    const [userData, setUserData] = useState({
        login: '',
        password: '',
    });
    const [errorKey, setErrorKey] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        const { success} = handleSignIn(userData.login, userData.password);

        if (success) {
            navigate('/home');
            setErrorKey('');
        }
        else {
            setErrorKey('invalid_data');
        }
    };

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

                <div className="pt-3">
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

export default SignInPage;