import {useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import {LanguageContext, translations} from '../../../app/providers/languageContext';
import {ThemeContext, images} from '../../../app/providers/themeContext';



import {handleSignIn} from "../../sign-up/model/authHandler";

export default function useSignIn() {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        login: '',
        password: '',
    });
    const [errorKey, setErrorKey] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {
        const {success} = handleSignIn(userData.login, userData.password);

        if (success) {
            navigate('/home');
            setErrorKey('');
        } else {
            setErrorKey('invalid_data');
        }
    };

    return {
        images, t, theme,
        userData, setUserData,
        errorKey, setErrorKey,
        showPassword, setShowPassword,
        handleSubmit,
    };
}