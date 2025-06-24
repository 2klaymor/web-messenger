import {useState, useRef} from "react";
import {useSetDisplayName} from '../../../features/set-display-name/useSetDisplayName'
import {useSetBio} from "../../../features/set-bio/useSetBio";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../app/contexts/authContext";
import {getMe} from "../../../entities/user/api-get-current-user";

export function useProfileSetupPage() {
    const displayNameRef = useRef(null);
    const bioRef = useRef(null);
    const navigate = useNavigate();
    const {user, setUser} = useAuth();

    const {setDisplayName} = useSetDisplayName();
    const {setBio} = useSetBio();

    const [errorKey, setErrorKey] = useState('');

    const handleSubmit = async () => {
        const newDisplayName = displayNameRef.current?.value.trim();
        const newBio = bioRef.current?.value?.trim();

        if (!newDisplayName) {
            setErrorKey("fill_display_name");
            return;
        }

        try {
            await setDisplayName(newDisplayName);
            if (newBio) {
                await setBio(newBio); // обновляем если есть био
            }
            const updatedUser = await getMe();
            setUser(updatedUser);
            navigate("/home");
        } catch (e) {
            console.error(e);
        }
    };

    return {displayNameRef, bioRef, handleSubmit, errorKey};
}