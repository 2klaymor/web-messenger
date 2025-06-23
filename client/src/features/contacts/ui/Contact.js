import {images} from "../../../app/contexts/themeContext";
import {useSelectedContact} from "../../../entities/contacts/useSelectedContact";

const Contact = ({ contact, pfp_path }) => {
    const {setSelectedContact} = useSelectedContact();

    const handleClick = () => {
        setSelectedContact(contact);
    };

    return (
        <div className="contact" onClick={handleClick}>
            <img className="contact__pfp" alt="pfp" src={pfp_path}/>

            <div className="contact__info">
                <p className="contact__name">{contact.displayName}</p>

                {/* TODO */}
                <p className="contact__last-message">мямумэ</p>
                <p className="contact__time">12:30</p>
                <img className="contact__read-status"
                     src={contact.isRead ? images.static.read : images.static.unread}
                     alt="read status"
                />
            </div>

        </div>
    );
};

export default Contact;