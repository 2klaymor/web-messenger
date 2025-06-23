import {api} from "../../shared/api/instance";

// проверка совпадения введенного пароля с данными в БД
export async function postSignIn({name, password}) {
    try {
        const formData = new URLSearchParams();
        formData.append("name", name);
        formData.append("password", password);

        const response = await api.post("/auth/login", formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = response.data;
        localStorage.setItem("accessToken", accessToken);

        return true;
    } catch (error) {
        console.error("sign in error:", error);
        return false;
    }

    // const response = await api.post("/auth/login", {name, password});
    // const accessToken = response.data;
    //
    // if (!accessToken) {
    //     throw new Error("no access token in response");
    // }
    //
    // try {
    //     localStorage.setItem("accessToken", accessToken);
    // } catch (e) {
    //     console.warn("access token save error", e);
    // }
    //
    // return accessToken;
}