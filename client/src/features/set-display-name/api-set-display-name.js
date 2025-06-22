import {api} from "../../shared/api/instance";

export async function patchDisplayName(displayName) {
    try {
        const response = await api.patch('/users/display-name', {displayName});
        return response.data;
    } catch (error) {
        console.error('displayName update error: ', error);
        throw error;
    }
}