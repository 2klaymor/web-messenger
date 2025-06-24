import {api} from "../../shared/api/instance";
import {images} from "../../app/contexts/themeContext";
import { getPfpUrl } from "./api-get-pfp";
import {format, isToday, isThisYear} from "date-fns";

export const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return "offline";
    if (lastSeen === "online") return "online";

    const date = new Date(lastSeen);

    if (isToday(date)) {
        return `${format(date, "HH:mm")}`;
    }

    if (isThisYear(date)) {
        return `${format(date, "dd.MM")}, ${format(date, "HH:mm")}`;
    }

    return format(date, "dd.MM.yy");
};

export const getUserPublicData = async (name) => {
    try {
        const {data} = await api.get(`/users/${name}`);

        return {
            name,
            displayName: data.displayName ?? name,
            bio: data.bio ?? '',
            pfp: getPfpUrl(data),
            lastSeen: formatLastSeen(data.lastSeen),
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