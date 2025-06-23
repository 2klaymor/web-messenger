import {api} from "../../shared/api/instance";
import {images} from "../../app/contexts/themeContext";
import {format} from "date-fns";

export const getUserPublicData = async (name) => {
    try {
        const {data} = await api.get(`/users/${name}`);

        let lastSeenFormatted;

        if (data.lastSeen === null) {
            lastSeenFormatted = "offline";
        } else if (data.lastSeen === "online") {
            lastSeenFormatted = "online";
        } else {
            lastSeenFormatted = format(new Date(data.lastSeen), "dd.MM.yy HH:mm");
        }

        return {
            name,
            displayName: data.displayName ?? name,
            bio: data.bio ?? '',
            pfp: data.pfp ?? images.static.pfp_placeholder,
            lastSeen: lastSeenFormatted
        };
    } catch (e) {
        // если пользователь не найден
        console.warn(`error getting public data for ${name}`);
        return {
            name,
            displayName: name,
            bio: '',
            pfp: images.static.pfp_placeholder,
            lastSeen: 'offline'
        };
    }
};