import {api} from '../../shared/api/instance';

export async function getUserMe() {
    const response = await api.get('/users/me');
    return response.data;
}