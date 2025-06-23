import {useState, useRef, useEffect} from "react";
import {useAuth, } from "../../../app/contexts/authContext";
import {useSetDisplayName} from "../../../features/set-display-name/useSetDisplayName";
import {useSetBio} from "../../../features/set-bio/useSetBio";
import {getMe} from "../../../entities/user/api-get-current-user";

const useAccountSection = () => {
    const {user, setUser} = useAuth();
    const displayNameRef = useRef(null);
    const aboutRef = useRef(null);

    const {setDisplayName} = useSetDisplayName();
    const {setBio} = useSetBio();
    const [errorKeys, setErrorKeys] = useState({
        displayName: '',
        submit: '',
    });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            displayNameRef.current.value = user.displayName || '';
            aboutRef.current.value = user.bio || '';
        }
    }, [user]);

    const handleSubmit = async () => {
        setSuccess(false);
        setErrorKeys({displayName: '', submit: ''});

        const newDisplayName = displayNameRef.current?.value.trim();
        const newBio = aboutRef.current?.value ?? '';

        if (!newDisplayName) {
            setErrorKeys({displayName: 'fill_display_name', submit: ''});
            return;
        }

        try {
            await setDisplayName(newDisplayName);
            await setBio(newBio);
            setSuccess(true);
            setErrorKeys({displayName: '', submit: 'success'});
            const newUser = await getMe();
            setUser(newUser);
        } catch (err) {
            console.error(err);
            setErrorKeys({displayName: '', submit: ''});
        }
    };

    return {success, errorKeys, displayNameRef, aboutRef, handleSubmit};
};

export {useAccountSection};
