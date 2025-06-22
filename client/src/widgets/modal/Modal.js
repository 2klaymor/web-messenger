// import {useContext} from "react";
import {createPortal} from "react-dom";
// import {images, ThemeContext} from "../../app/contexts/themeContext";

export const Modal = ({onClose, children}) => {
    // const {theme} = useContext(ThemeContext);

    const handleBackdropClick = (e) => {
        onClose();
    };

    return createPortal (
        <div className="modal-wrapper" onClick={handleBackdropClick}>
            <div className="modal">
                {/*<img className="modal__close"*/}
                {/*     src={images[theme].close}*/}
                {/*     onClick={onClose}*/}
                {/*     alt="close"/>*/}
                {children}
            </div>
        </div>,

        document.getElementById("modal-root")
    );
}