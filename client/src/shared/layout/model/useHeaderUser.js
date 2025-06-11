import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../app/utils/authContext";
import {signOut} from "../../../features/sign-out/api-sign-out";

export default function useHeaderUser() {
    const {updateIsAuth} = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(e) {
            // если клик был не по контейнеру, закрываем
            if (!e.target.closest('.header-user__dropdown')) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const navigate = useNavigate();
    const handleLogout = async (e) => {
        localStorage.removeItem('accessToken');
        try {
            await signOut();
            updateIsAuth(true);
            navigate('/signin');
        } catch (error) {
            console.warn('Logout error: ', error)
        }
    }

    return {isOpen, setIsOpen, handleLogout};
}