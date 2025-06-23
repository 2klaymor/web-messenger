import {api} from "../../shared/api/instance"

export async function patchUserBio(bio) {
    const response = await api.patch("/users/bio", {bio});
    return response.data;
}