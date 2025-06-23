import {useChatHeader} from "./model/useChatHeader";
import {useSelectedContact} from "../../../../entities/contacts/useSelectedContact";
import ProfileModal from "../../../../widgets/profile-modal/ProfileModal";
import SvgChatHeader from "../../../../assets/SvgChatHeader";

export const ChatHeader = () => {
    const {showProfileModal, setShowProfileModal} = useChatHeader();
    const {selectedContact} = useSelectedContact();

    return (
        <div className="chat__header">
            <SvgChatHeader/>
            {selectedContact ? (
                <div className="chat__contact-info"
                     onClick={() => setShowProfileModal(true)}>
                    <div className="chat__contact-name">{selectedContact.displayName}</div>
                    <div className="chat__contact-status">online</div>

                    {showProfileModal && (
                        <ProfileModal
                            onClose={() => setShowProfileModal(false)}
                            userType="contact"
                            userInfo={selectedContact}
                        />
                    )}
                </div>

            ) : (
                <div/>
            )}
        </div>
    );
}