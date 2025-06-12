import {images} from "../../app/contexts/themeContext";

export function ToggleVisibilityIcon({show, onClick}) {
    const src = show ? images.static.show : images.static.hide;

    return (
        <button className="button_no-style toggle-visibility-eye" type="button" onClick={onClick}>
            <img
                src={src}
                alt={show ? "hide" : "show"}/>
        </button>
    );
}