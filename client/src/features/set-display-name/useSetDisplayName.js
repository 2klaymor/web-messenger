import {patchDisplayName} from "./api-set-display-name";
import {getUserMe} from "../../entities/user/api-user-entity";
import {useAuth} from "../../app/contexts/authContext";

export function useSetDisplayName() {
    const {setUser} = useAuth();

    const setDisplayName = async (newDisplayName) => {
        // displayName пустой?
        if (!newDisplayName?.trim()) {
            throw new Error("empty display name");
        }

        await patchDisplayName(newDisplayName);
        const updatedUser = await getUserMe();
        setUser(updatedUser);
    }

    return {setDisplayName};
}