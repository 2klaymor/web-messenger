import {useState} from "react";

export const useChatHeader = () => {
    const [showProfileModal, setShowProfileModal] = useState(false);

    return {showProfileModal, setShowProfileModal};
}