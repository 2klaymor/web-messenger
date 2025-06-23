import {api} from "../../shared/api/instance";

export const searchUsers = async query => {
    try {
        const response = await api.get('/users/search', {
            params: {query},
        });
        return response.data;
    } catch (error) {
        console.error('error searching:', error);
        throw error;
    }
};