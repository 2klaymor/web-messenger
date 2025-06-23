import {api} from "../../shared/api/instance";
import {getUserPublicData} from "../user/api-get-user-public-data";

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