import {useContext} from "react";
import {images} from "../../../app/contexts/themeContext";
import {selectedContactStore} from "../../../entities/contacts/selectedContactStore";

const Contact = ({ user, onClick }) => {
    const {setSelectedContact} = selectedContactStore();

    const handleClick = () => {
        onClick();
        setSelectedContact(user);
    };

    return (
        <div className="contact" onClick={handleClick}>
            {/* TODO : contact.pfp_path */}
            <img className="contact__pfp" src={user.pfp} alt="pfp" />

            <div className="contact__info">
                <p className="contact__name">{user.displayName}</p>
                {/* TODO */}
                <p className="contact__last-message">{user.bio}</p>
                <p className="contact__created-at">12:30</p>
                <img className="contact__read-status"
                     src={user.isRead ? images.static.read : images.static.unread}
                     alt="read status"
                />
            </div>

        </div>
    );
};

export default Contact;