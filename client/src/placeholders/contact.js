const ContactPlaceholder = ({ path, name, lastMessage }) => {
    return (
        <button className="contact btn" type="button">
            <img alt="pfp" height="40px" src={path}/>

            <div className="contact-info">
                <span className="name">{name}</span>
                <span className="last-message">{lastMessage}</span>
            </div>
        </button>
    );
};

export default ContactPlaceholder;