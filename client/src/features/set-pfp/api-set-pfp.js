import {api} from "../../shared/api/instance";

export async function patchUserPfp(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.patch("/users/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
}