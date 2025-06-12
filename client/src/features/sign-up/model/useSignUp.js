import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {postSignUp} from "../api/api-sign-up";
import {getUserMe} from "../../../entities/user/api-user-entity";
import {useAuth} from "../../../app/contexts/authContext";

export const useSignUp = () => {
    const {setUser} = useAuth();
    const navigate = useNavigate();
    const passwordRef = useRef(null);

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errorKeys, setErrorKeys] = useState({
        username: '',
        email: '',
        password: '',
        submit: ''
    });

    const [isDisabled, setIsDisabled] = useState(false);

    // const [showVerification, setShowVerification] = useState(false);

    // валидация полей
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const emailError = userData.email && !emailRegex.test(userData.email) ? 'invalid_email' : '';
        const passwordError = userData.password && userData.password.length < 8 ? 'password_too_short' : '';


        setErrorKeys(prev => ({
            ...prev,
            email: emailError,
            password: passwordError,
        }));

        const isInvalid = !userData.username || !userData.email || !userData.password || emailError || passwordError;
        setIsDisabled(isInvalid);

    }, [userData.username, userData.email, userData.password]);

    // сброс ошибки в username после сабмита
    useEffect(() => {
        if (errorKeys.username) {
            setErrorKeys(prev => ({...prev, username: ''}));
        }
    }, [userData.username]);


    const handleSubmit = async () => {
        const {username, email, password} = userData;

        // есть ошибки - не отправляем запрос
        // ПЛОХО т.к. пользователь может переопределить errorKeys в консоли. нужна доп. проверка на сервере
        if (!username || !email || !password) {
            setErrorKeys(prev => ({...prev, submit: 'fill_all_fields'}));
            return;
        }

        if (errorKeys.email || errorKeys.password) {
            setErrorKeys(prev => ({...prev, submit: ''}));
            return;
        }

        try {
            // запрос на регистрацию
            const accessToken = await postSignUp({
                // displayName: username,
                name: username,
                password
            });

            // регистрация не удалась
            if (!accessToken) {
                setErrorKeys(prev => ({
                    ...prev,
                    username: 'username_taken', // ← вот тут
                }));
                return;
            }

            // регистрация удалась
            const me = await getUserMe();
            setUser(me);
            navigate('/setup');
            // setShowVerification(true);

        } catch (err) {
            setErrorKeys(prev => ({...prev, submit: 'signup_failed'}));
        }
    };

    return {
        passwordRef,
        userData, setUserData,
        errorKeys, setErrorKeys,
        // showVerification, setShowVerification,
        isDisabled, handleSubmit
    };
};