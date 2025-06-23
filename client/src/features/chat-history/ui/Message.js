const Message = ({sender, contents, time}) => {
    const isMe = sender === "me";
    return (
        <div className={`message ${isMe ? "message-sent" : "message-received"}`}>
            <div className="message__content">{contents}</div>
            <div className="message__time">{time}</div>
        </div>
    );
};

export default Message;