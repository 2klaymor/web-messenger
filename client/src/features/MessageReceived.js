const MessageSent = ({contents, time}) => {
    return (

        <div className="message message-received">
            <div className="message-contents">{contents}</div>
            <div className="message-time">{time}</div>
        </div>

    );
}

export default MessageSent;