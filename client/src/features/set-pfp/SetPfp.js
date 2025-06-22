import {useState, useRef} from "react";
import {images} from "../../app/contexts/themeContext";

export default function SetPfp({imgClassName}) {
    const fileInputRef = useRef(null);
    const [pfpPreview, setPfpPreview] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPfpPreview(URL.createObjectURL(file));
        }
    };

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
