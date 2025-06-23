import {patchUserBio} from "./api-set-bio";

export function useSetBio() {
    const setBio = async (bio) => {
        // пустую строку можно
        await patchUserBio(bio);
    };

    return {setBio};
}