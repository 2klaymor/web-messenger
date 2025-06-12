import {api} from "../../shared/api/instance";

// проверка совпадения введенного пароля с данными в БД
export async function postSignIn({name, password}) {
    const response = await api.post("/auth/login", {name, password});
    const accessToken = response.data;

    if (!accessToken) {
        throw new Error("no access token in response");
    }

    try {
        localStorage.setItem("accessToken", accessToken);
    } catch (e) {
        console.warn("access token save error", e);
    }

    return accessToken;
}