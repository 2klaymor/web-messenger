import {useState, useRef, useEffect} from "react";
import {useAuth} from "../../../app/contexts/authContext";
import {useSetDisplayName} from "../../../features/set-display-name/useSetDisplayName";

const useAccountSection = () => {
    const {user} = useAuth();
    const usernameRef = useRef(null);
    const displayNameRef = useRef(null);
    const aboutRef = useRef(null);

    useEffect(() => {
        if (user) {
            usernameRef.current.value = user.name;
            displayNameRef.current.value = user.displayName;
            aboutRef.current.value = localStorage.getItem('about'); // плейсхолдер
        }
    }, [user]);

    const {setDisplayName} = useSetDisplayName();
    const [errorKeys, setErrorKeys] = useState({
        username: '',
        displayName: '',
        submit: '',
    });
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        try {
            const newDisplayName = displayNameRef.current?.value;
            const newAbout = aboutRef.current?.value;

            await setDisplayName(newDisplayName);
            localStorage.setItem('about', newAbout); // плейсхолдер

            setSuccess(true);
            setErrorKeys(prevState => ({
                ...prevState,
                displayName: '',
                submit: 'success',
            }))
        } catch (error) {
            console.error(error);
            setErrorKeys(prevState => ({
                ...prevState,
                displayName: 'fill_display_name',
                submit: '',
            }));
        }
    };

    return {success, errorKeys, usernameRef, displayNameRef, aboutRef, handleSubmit};
};

export {useAccountSection};
