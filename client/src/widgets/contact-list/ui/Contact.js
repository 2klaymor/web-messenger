import {images} from "../../../app/contexts/themeContext";

const Contact = ({ path, name, time, lastMessage, lastMessageReadStatus }) => {

    return (
        <li className="contact">
            <img className="contact__pfp" alt="pfp" src={path}/>

            <div className="contact__info">
                <div className="contact__space-between">
                    <p className="contact__name">{name}</p>
                    <p className="contact__last-message-time">{time}</p></div>
                <div className="contact__space-between">
                    <p className="contact__last-message">{lastMessage}</p>
                    <img className="contact__read-status"
                         src={lastMessageReadStatus ? images.static.read : images.static.unread}/>
                </div>
            </div>
        </li>
    );
};

export default Contact;