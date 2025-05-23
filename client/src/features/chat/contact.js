const ContactPlaceholder = ({ path, name, lastMessage }) => {
    return (
        <button className="contact" type="button">
            <img alt="pfp" src={path}/>

            <div className="contact-info">
                <span className="name">{name}</span>
                <span className="last-message">{lastMessage}</span>
            </div>
        </button>
    );
};

export default ContactPlaceholder;