import {api} from "../../shared/api/instance";

// проверка совпадения введенного пароля с данными в БД
export async function checkPassword(login, password) {
    try {
        const { data: isValid } = await api.post(
            `/users/${encodeURIComponent(login)}/check-password`,
            {password},
        );
        return isValid;
    } catch (error) {
        throw error;
    }
}