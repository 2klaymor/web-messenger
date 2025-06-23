import {api} from "../../shared/api/instance";

export async function patchPassword(oldPassword, password) {
    const response = await api.patch('/users/password', { oldPassword, password });
    return response.data;
}