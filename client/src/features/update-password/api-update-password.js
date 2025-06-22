import {api} from "../../shared/api/instance";

export async function patchPassword(newPassword) {
    await api.patch('/users/password', {
        password: newPassword
    });
}