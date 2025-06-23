import {images} from "../../app/contexts/themeContext";
import {useSetPfp} from "./useSetPfp";

export default function SetPfp({imgClassName}) {
    const {
        fileInputRef, pfpPreview, handleFileChange,
    } = useSetPfp();

    return (
        <label className="set-pfp">
            <img
                className={`set-pfp__pfp ${imgClassName}`}
                src={pfpPreview || images.static.pfp_placeholder}
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
