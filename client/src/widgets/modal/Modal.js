import {useContext} from "react";
import {images, ThemeContext} from "../../app/contexts/themeContext";

const Modal = ({onClose, children}) => {
    const {theme} = useContext(ThemeContext);

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <img className="modal__close" src={images[theme].close} onClick={onClose} alt="close"/>
                {children}
            </div>
        </div>
    );
}