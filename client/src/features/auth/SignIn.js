import {Link, useNavigate} from 'react-router-dom';
import {useState, useContext} from "react";

import {LanguageContext, translations} from '../../utils/language';
import {ThemeContext, images} from '../../utils/theme';

import ErrorMessage from '../../components/ErrorMessage';
import ToggleVisibility from "../../components/ToggleVisibility";

import {handleSignIn} from "./authHandler";

const SignIn = () => {
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
        <div className="signin-container">

            {/* top */}
            <img src={images[theme].logo_blur} alt="logo"/>
            <h1>{t.signin_welcome}</h1>

            {/* form */}
            <div className="form">

                <label htmlFor="inputLogin">{t.login}</label>
                <input type="email" id="inputLogin"
                       placeholder="example@example.com"
                       value={userData.login}
                       onChange={(e) =>
                           setUserData(prev => ({...prev, login: e.target.value}))}
                />

                <div className="pt-3">
                    <label htmlFor="inputPassword">{t.password}</label>
                    <Link to="#" className="ms-auto float-end">{t.forgot_password}</Link>
                </div>
                <div className="password-container">
                    <input id="inputPassword" type={showPassword ? 'text' : 'password'}
                           value={userData.password}
                           onChange={(e) =>
                               setUserData(prev => ({...prev, password: e.target.value}))}
                    />
                    <ToggleVisibility state={showPassword} image_key1="show" image_key2="hide"
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

export default SignIn;