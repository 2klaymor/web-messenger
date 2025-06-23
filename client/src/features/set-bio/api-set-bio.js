import {api} from "../../shared/api/instance"

export async function patchUserBio(bio) {
    try {
        const response = await api.patch("/users/bio", {bio});
        return response.data;
    } catch (error) {
        console.error('bio update error: ', error);
        throw error;
    }
}