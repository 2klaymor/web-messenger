import {useContext} from "react";
import {translations, LanguageContext} from "../../../app/contexts/languageContext";
import {useAuth} from "../../../app/contexts/authContext";
import {selectedContactStore} from "../../../entities/contacts/selectedContactStore";
import {useChatHeader} from "../model/useChatHeader";
import ProfileModal from "../../../widgets/profile-modal/ProfileModal";
import SvgChatHeader from "../../../assets/SvgChatHeader";

export const ChatHeader = () => {
    const {language} = useContext(LanguageContext);
    const t = translations[language];

    const {showProfileModal, setShowProfileModal} = useChatHeader();
    const {selectedContact} = selectedContactStore();
    const {user: currentUser} = useAuth();

    if (!selectedContact) return null;

    const userType = selectedContact?.name === currentUser.name ? "self" : "other";

    return (
        <div className="chat__header">
            <SvgChatHeader/>

            <div className="chat__contact-info"
                 onClick={() => setShowProfileModal(true)}>
                <div className="chat__contact-name">{selectedContact.displayName}</div>
                <div className="chat__contact-status">{t.status.last_seen}{selectedContact.lastSeen}</div>

                {showProfileModal && (
                    <ProfileModal
                        onClose={() => setShowProfileModal(false)}
                        userType={userType}
                        user={selectedContact}
                    />
                )}
            </div>
        </div>
    );
}