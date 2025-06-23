import {useRef, useState} from "react";
import {patchUserPfp} from "./api-set-pfp";

export function useSetPfp() {
    const fileInputRef = useRef(null);
    const [pfpPreview, setPfpPreview] = useState(null);

    const handleFileChange = async (e) => {
        // превью
        const file = e.target.files?.[0];
        if (!file) return;

        setPfpPreview(URL.createObjectURL(file));

        // отправление на сервер
        try {
            await patchUserPfp(file);
        } catch (err) {
            console.error("error uploading pfp:", err);
        }
    };

    return {
        fileInputRef,
        pfpPreview,
        handleFileChange,
    };
}