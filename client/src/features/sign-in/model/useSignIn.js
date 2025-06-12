import {useState, useRef} from "react";
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../../../app/contexts/authContext";
import {postSignIn} from '../api-sign-in';
import {getUserMe} from "../../../entities/user/api-user-entity";

export default function useSignIn() {
    const {setUser} = useAuth();
    const navigate = useNavigate();

    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const [errorKey, setErrorKey] = useState('');

    const handleSubmit = async () => {
        setErrorKey('');

        const name = nameRef.current?.value.trim();
        const password = passwordRef.current?.value;

        if (!name || !password) {
            setErrorKey('all_fields_required');
            return;
        }

        try {
            localStorage.removeItem("accessToken");
            await postSignIn({name, password});

            const userData = await getUserMe();
            setUser(userData);

            navigate('/home');
        } catch (err) {
            setErrorKey('invalid_credentials');
        }
    };

    return {
        nameRef, passwordRef,
        handleSubmit,
        errorKey,
    };
}