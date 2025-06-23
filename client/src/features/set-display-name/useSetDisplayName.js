import {patchDisplayName} from "./api-set-display-name";
import {getMe} from "../../entities/user/api-get-current-user";
import {useAuth} from "../../app/contexts/authContext";

export function useSetDisplayName() {
    const {setUser} = useAuth();

    const setDisplayName = async (newDisplayName) => {
        // displayName пустой?
        if (!newDisplayName?.trim()) {
            throw new Error("empty display name");
        }

        await patchDisplayName(newDisplayName);
        const updatedUser = await getMe();
        setUser(updatedUser);
    }

    return {setDisplayName};
}