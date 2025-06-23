import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {postSignUp} from "../api/api-sign-up";
import {getMe} from "../../../entities/user/api-get-current-user";
import {useAuth} from "../../../app/contexts/authContext";

export const useSignUp = () => {
    const {setUser} = useAuth();
    const navigate = useNavigate();
    const passwordRef = useRef(null);

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [errorKeys, setErrorKeys] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        submit: ''
    });

    const [isDisabled, setIsDisabled] = useState(false);
    // const [showVerification, setShowVerification] = useState(false);

    // валидация полей
    useEffect(() => {
       const passwordError = userData.password && userData.password.length < 8 ? 'password_too_short' : '';
       const confirmError =
           userData.confirmPassword &&
           userData.password &&
           userData.password !== userData.confirmPassword
               ? 'passwords_do_not_match'
               : '';

            setErrorKeys(prev => ({
                ...prev,
                password: passwordError,
                confirmPassword: confirmError,
            }));

        const isInvalid = !userData.username || !userData.password || !userData.confirmPassword || passwordError || confirmError;
        setIsDisabled(isInvalid);

    }, [userData.username, userData.password, userData.confirmPassword]);

    // сброс ошибки в username после сабмита
    useEffect(() => {
        if (errorKeys.username) {
            setErrorKeys(prev => ({...prev, username: ''}));
        }
    }, [userData.username]);

    const handleSubmit = async () => {
        const {username, password, confirmPassword} = userData;

        // есть ошибки - не отправляем запрос
        // ПЛОХО т.к. пользователь может переопределить errorKeys в консоли. нужна доп. проверка на сервере
        if (!username || !password || !confirmPassword) {
            setErrorKeys(prev => ({...prev, submit: 'fill_all_fields'}));
            return;
        }

        if (errorKeys.password || errorKeys.confirmPassword) {
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
            const me = await getMe();
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