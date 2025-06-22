import {useState} from "react";

export const useProfileModal = () => {
    const [added, setAdded] = useState(false);
    const handleAdd = () => setAdded(true);

    const handleInsideClick = (e) => {
        e.stopPropagation(); // ← вот ключ
    };

    return {handleInsideClick, added, handleAdd}
};