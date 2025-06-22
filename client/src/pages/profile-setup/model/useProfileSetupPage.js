import {useState, useRef} from "react";
import {useSetDisplayName} from '../../../features/set-display-name/useSetDisplayName'
import {useNavigate} from "react-router-dom";

export function useProfileSetupPage() {
    const displayNameRef = useRef(null);
    const navigate = useNavigate();
    const {setDisplayName} = useSetDisplayName();
    const [errorKey, setErrorKey] = useState('');

    const handleSubmit = async () => {
        try {
            const newDisplayName = displayNameRef.current?.value;
            await setDisplayName(newDisplayName);
            navigate("/home");
        } catch (e) {
            setErrorKey(prevState => "fill_display_name")
        }
    };

    return {displayNameRef, handleSubmit, errorKey};
}