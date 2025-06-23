import {api} from "../../shared/api/instance";
import {images} from "../../app/contexts/themeContext";
import {format} from 'date-fns';

const getUserPublicData = async (name) => {
    try {
        const {data} = await api.get(`/users/${name}`);
        return {
            displayName: data.displayName ?? name,
            bio: data.bio ?? '',
            pfp: data.pfp ?? images.static.pfp_placeholder,
            lastSeen: data.lastSeen ? format(new Date(data.lastSeen), "HH:mm") : "..."
        };
    } catch (e) {
        console.warn(`error getting public data for ${name}`);
        return {
            displayName: name,
            bio: '',
            pfp: images.static.pfp_placeholder,
            lastSeen: '...' // ВРЕМЕННО
        };
    }
};

export const getContacts = async () => {
    const {data: contacts} = await api.get('/contacts');

    return await Promise.all(
        contacts.map(async (contact) => {
            const {displayName, bio, pfp, lastSeen} = await getUserPublicData(contact.targetName);

            return {
                name: contact.targetName,
                displayName,
                bio,
                pfp,
                lastSeen
            };
        })
    );
};