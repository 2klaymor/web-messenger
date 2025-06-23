import {useContext} from "react";
import {translations, LanguageContext} from "../../app/contexts/languageContext";
import {images, ThemeContext} from "../../app/contexts/themeContext";
import {useProfileModal} from "./useProfileModal";
import {Modal} from "../modal/Modal";
import Button from "../../shared/ui/Button";

export default function ProfileModal({userType, userInfo, onClose}) {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    const {name, displayName, lastSeen} = userInfo;
    const about = localStorage.getItem('about');

    const {
        handleInsideClick, handleEdit,
        handleAdd, handleRemove,
        isContact, isLoading,
    } = useProfileModal(userType, userInfo);

    return (
        <Modal onClose={onClose}>
        <div className="profile-modal form" onClick={handleInsideClick}>
            {/* меню с кнопками сверху */}

            <div className="profile-modal__menu">
                {userType === 'contact' &&
                    <img src={images[theme].block}
                         alt="block"
                    />
                }

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
                    <p className="profile-modal__username">@{name}</p>
                    <p>{lastSeen}</p>
                </div>
            </div>

            {userType === 'me' &&
                <Button onClick={() => handleEdit(onClose)}>{t.buttons.edit}</Button>
            }
            {userType !== 'me' && !isLoading && (
                <Button onClick={isContact ? handleRemove : handleAdd}>
                    {isContact ? t.home.contacts.remove : t.home.contacts.add}
                </Button>
            )}
            {userType !== 'me' && isLoading && (
                <Button disabled>{t.errors.loading}</Button>
            )}

            <hr/>

            {/* доп. информация */}
            <div>
                <p className="profile-modal__label">{t.fields.about_me}</p>
                <p className="profile-modal__about">{about}</p>
            </div>
        </div>
        </Modal>
    );
}