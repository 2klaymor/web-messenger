import {useContext} from "react";
import {translations, LanguageContext} from "../../app/contexts/languageContext";
import {images, ThemeContext} from "../../app/contexts/themeContext";
import {useProfileModal} from "./useProfileModal";
import Button from "../../shared/ui/Button";

export default function ProfileModal({userInfo, onClose}) {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    const {username, displayName, lastSeen, about} = userInfo;

    const {handleInsideClick, added, handleAdd} = useProfileModal();

    return (
        <div className="profile-modal form" onClick={handleInsideClick}>
            {/* меню с кнопками сверху */}
            <div className="profile-modal__menu">
                <img src={images[theme].block}
                     alt="block"
                />

                <img src={images[theme].close}
                     onClick={onClose}
                     alt="close"
                />
            </div>

            {/* пфп и имя */}
            <div className="profile-modal__header">
                <img className="profile-modal__pfp" src="/pfp.png"/>
                <div className="d-column">
                    <p className="profile-modal__display-name">{displayName}</p>
                    <p className="profile-modal__username">@{username}</p>
                    <p>{lastSeen}</p>
                </div>
            </div>
            <Button onClick={handleAdd}>{added ? t.home.contacts.in_contacts : t.home.contacts.add}</Button>

            <hr/>

            {/* доп. информация */}
            <div>
                <p className="profile-modal__label">{t.fields.about_me}</p>
                <p className="profile-modal__about">{about}</p>
            </div>
        </div>
    );
}