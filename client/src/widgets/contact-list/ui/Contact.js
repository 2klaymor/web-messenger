import {images} from "../../../app/contexts/themeContext";

const Contact = ({ path, name, time, lastMessage, lastMessageReadStatus }) => {

    return (
        <div className="contact">
            <img className="contact__pfp" alt="pfp" src={path}/>

            <div className="contact__info">
                <p className="contact__name">{name}</p>
                <p className="contact__last-message">{lastMessage}</p>
                <p className="contact__time">{time}</p>
                <img className="contact__read-status"
                     src={lastMessageReadStatus ? images.static.read : images.static.unread}
                     alt="read status"
                />
            </div>

        </div>
    );
};

export default Contact;