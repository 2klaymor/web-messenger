const MessageSent = ({contents, time}) => {
    return (

        <div className="message message-received">
            <div className="message-content">{contents}</div>
            <div className="message-time">{time}</div>
        </div>

    );
}

export default MessageSent;