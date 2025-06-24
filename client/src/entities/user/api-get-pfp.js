import {images} from "../../app/contexts/themeContext";

export const getPfpUrl = (user) => {
    if (!user.avatar) return images.static.pfp_placeholder;
    return `http://localhost:3001/avatars/${user.avatar}`;
}