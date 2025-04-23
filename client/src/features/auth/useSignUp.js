import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {handleSignUp} from "./authHandler";

export const useSignUp = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errorKeys, setErrorKeys] = useState({
        username: '',
        email: '',
        password: '',
        submit: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const navigate = useNavigate();
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    const validateEmail = (email) => {
        if (!email) return '';
        return emailRegex.test(email) ? '' : 'invalid_email';
    };

    const validatePassword = (password) => {
        if (!password) return '';
        return password.length >= 8 ? '' : 'short_password';
    }

    // обновление полей при изменении введенных данных
    useEffect(() => {
        setErrorKeys(prev => ({
            ...prev,
            email: validateEmail(userData.email),
            password: validatePassword(userData.password),
        }));
    }, [userData.email, userData.password]);

    useEffect(() => {
        if (errorKeys.username) {
            setErrorKeys(prev => ({
                ...prev,
                username: '',
            }));
        }
    }, [userData.username]);


    // обработка нажатия на кнопку
    const handleSubmit = () => {
        const {username, email, password} = userData;

        if (!username || !email || !password) {
            setErrorKeys(prev => ({
                ...prev,
                submit: 'fill_all_fields'
            }));
            return;
        }

        if (errorKeys.email === 'invalid_email' || errorKeys.password === 'short_password') {
            setErrorKeys(prev => ({
                ...prev,
                submit: ''
            }));
            return;
        }

        if (!errorKeys.username && !errorKeys.email && !errorKeys.password) {
            const result = handleSignUp(username, email, password);

            if (result.success) {
                setShowVerification(true);
            } else {
                setErrorKeys(prev => ({
                    ...prev,
                    ...result.errors,
                    submit: '',
                }));
            }
        }
    };

    return {
        userData, setUserData,
        errorKeys, setErrorKeys,
        showPassword, setShowPassword,
        showVerification, setShowVerification,
        handleSubmit
    };
};