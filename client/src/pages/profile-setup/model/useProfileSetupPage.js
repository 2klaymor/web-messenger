import {useState, useRef} from "react";
import {useSetDisplayName} from '../../../features/set-display-name/useSetDisplayName'
import {useSetBio} from "../../../features/set-bio/useSetBio";
import {useNavigate} from "react-router-dom";

export function useProfileSetupPage() {
    const displayNameRef = useRef(null);
    const bioRef = useRef(null);
    const navigate = useNavigate();

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
            navigate("/home");
        } catch (e) {
            console.error(e);
        }
    };

    return {displayNameRef, bioRef, handleSubmit, errorKey};
}