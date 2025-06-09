import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {checkPassword} from '../api';

export default function useSignIn() {
    const [userData, setUserData] = useState({ login: '',  password: '' });
    const [errorKey, setErrorKey] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setErrorKey('');
        try {
            const isValid = await checkPassword(userData.login, userData.password);
            console.log('isValid:', isValid);
            if (isValid) {
                navigate('/home');
            } else {
                setErrorKey('invalid_data');
                console.log('invalid data');
            }
        } catch (error) {
            setErrorKey('invalid_data');
        }
    };

    return {
        userData, setUserData,
        handleSubmit,
        errorKey,
    };
}