import {api} from '../../shared/api/instance';
import {getPfpUrl} from './api-get-pfp';

export async function getMe() {
    const response = await api.get('/auth/me');
    const currentUser = response.data;

    const fullUser = {...currentUser, pfp: getPfpUrl(currentUser)}

    console.log('currentUser', JSON.stringify(fullUser));

    return {...currentUser, pfp: getPfpUrl(currentUser)}
}