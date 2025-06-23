import {useContext} from "react";
import {translations, LanguageContext} from "../../app/contexts/languageContext";
import {images, ThemeContext} from "../../app/contexts/themeContext";
import {useProfileModal} from "./useProfileModal";
import {Modal} from "../modal/Modal";
import Button from "../../shared/ui/Button";

export default function ProfileModal({userType, user, onClose}) {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    const {
        handleInsideClick, handleEdit,
        handleAdd, handleRemove,
        isContact, isLoading,
    } = useProfileModal(userType, user, onClose);

    return (
        <Modal onClose={onClose}>
        <div className="profile-modal form" onClick={handleInsideClick}>

            {/* кнопки сверху */}
            <div className="profile-modal__menu">
                {userType === 'other' && (
                    <img src={images[theme].block} alt="block"/>
                )}
                <img src={images[theme].close} onClick={onClose} alt="close"/>
            </div>

            {/* пфп и имя */}
            <div className="profile-modal__header">
                <img className="profile-modal__pfp" src={user.pfp || images.static.pfp_placeholder}/>
                <div className="d-column">
                    <p className="profile-modal__display-name">{user.displayName}</p>
                    <p className="profile-modal__username">@{user.name}</p>

                    {userType === 'other' && (
                        <p className="profile-modal__last-seen">
                            {user.lastSeen === "online"
                                ? t.status.online
                                : user.lastSeen === "offline"
                                    ? t.status.offline
                                    : `${t.status.last_seen}${user.lastSeen}`}
                        </p>
                    )}
                </div>
            </div>

            {userType === 'self' && (
                <Button onClick={handleEdit}>{t.buttons.edit}</Button>
            )}
            {userType === 'other' && (
                <Button
                    disabled={isLoading}
                    onClick={isContact ? handleRemove : handleAdd}
                >
                    {isContact
                        ? t.home.contacts.remove
                        : t.home.contacts.add}
                </Button>
            )}

            <hr/>

            {/* доп. информация */}
            <div>
                <p className="profile-modal__label">{t.fields.about_me}</p>
                <p className="profile-modal__about">{user.bio}</p>
            </div>
        </div>
        </Modal>
    );
}