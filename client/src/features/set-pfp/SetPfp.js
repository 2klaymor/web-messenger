import {images} from "../../app/contexts/themeContext";
import {useSetPfp} from "./useSetPfp";
import {useAuth} from "../../app/contexts/authContext";

export default function SetPfp({imgClassName}) {
    const {user} = useAuth();
    const {
        fileInputRef, pfpPreview, handleFileChange,
    } = useSetPfp();

    return (
        <label className="set-pfp">
            <img
                className={`set-pfp__pfp ${imgClassName}`}
                src={pfpPreview === null ? user.pfp : pfpPreview}
                alt="your pfp"
            />
            <div className="set-pfp__overlay">
                <img
                    className="set-pfp__edit-icon"
                    src={images.static.edit}
                    alt="edit"
                />
            </div>
            <input type="file" hidden
                   accept="image/*"
                   ref={fileInputRef}
                   onChange={handleFileChange}
            />
        </label>
    )
}
