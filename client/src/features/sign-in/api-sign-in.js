import {api} from "../../shared/api/instance";

// проверка совпадения введенного пароля с данными в БД
export async function postSignIn({name, password}) {
    const response = await api.post("/auth/login", {name, password});
    const token = response.data;
    localStorage.setItem("accessToken", token);
    return token;
}