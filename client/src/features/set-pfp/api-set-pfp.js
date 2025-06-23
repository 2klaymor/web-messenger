import {api} from "../../shared/api/instance";

export async function patchUserPfp(file) {
    const formData = new FormData();
    formData.append("pfp", file); // ключ зависит от сервера

    const response = await api.patch("/users/pfp", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
}