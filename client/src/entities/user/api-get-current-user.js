import {api} from '../../shared/api/instance';
import {images} from '../../app/contexts/themeContext';

export async function getMe() {
    const response = await api.get('/auth/me');
    const currentUser = response.data;

    // ЗАГЛУШКА
    return {
        ...currentUser,
        bio: currentUser.bio,
        pfp: currentUser.pfp || images.static.pfp_placeholder,
    }
}