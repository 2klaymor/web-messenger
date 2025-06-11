import {useState, useRef} from "react";
import {useNavigate} from 'react-router-dom';
import {postSignIn} from '../api-sign-in';
import {useAuth} from "../../../app/utils/authContext";

export default function useSignIn() {
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const [errorKey, setErrorKey] = useState('');
    const navigate = useNavigate();
    const {updateIsAuth} = useAuth();

    const handleSubmit = async () => {
        setErrorKey(null);

        const name = nameRef.current?.value || '';
        const password = passwordRef.current?.value || '';

        try {
            await postSignIn({name, password});
            updateIsAuth(true);
            navigate('/home');
        } catch (err) {
            console.error('SignIn error', err);
            setErrorKey('invalid_credentials');
        }
    };

    return {
        nameRef, passwordRef,
        handleSubmit,
        errorKey,
    };
}