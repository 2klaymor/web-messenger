import {useState, useRef} from "react";
import {images} from "../../app/providers/themeContext";

export const ToggleVisibility = () => {
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);

    const toggle = () => {
        const input = inputRef.current;
        if (!input) {
            setShowPassword(v => !v);
            return;
        }

        const start = input.selectionStart;
        const end = input.selectionEnd;
        setShowPassword(v => !v);

        setTimeout(() => {
            input.setSelectionRange(start, end);
            input.focus();
        }, 0);
    };

    function ToggleVisibilityIcon() {
        return (
            <img
                role="button"
                className="toggle-visibility-eye"
                src={showPassword ? images.static.show : images.static.hide}
                onMouseDown={e => e.preventDefault()}
                onTouchStart={e => e.preventDefault()}
                onClick={toggle}
            />
        );
    }

    return {
        ToggleVisibilityIcon,
        inputRef,
        showPassword
    }
}
