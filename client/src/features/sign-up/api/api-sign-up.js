import {api} from "../../../shared/api/instance";

export async function postSignUp({displayName, name, password}) {
    try {
        const response = await api.post('/auth/register', {
            // displayName,
            name,
            password
        });

        const accessToken = response.data;

        // accessToken не пришел?
        if (!accessToken) {
            console.warn("no access token in response");
            return null;
        }

        // сохраняем токен в localStorage
        try {
            localStorage.setItem('accessToken', accessToken);
        } catch (error) {
            console.warn("access token save error", error);
        }

        return accessToken;

    } catch (error) {
        console.error('signup error:', error);
        throw error;
    }
}