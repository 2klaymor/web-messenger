const MessageSent = ({contents, time}) => {
    return (

        <div className="message message-sent">
            <div className="message-contents">{contents}</div>
            <div className="message-time">{time}</div>
        </div>

    );
}

export default MessageSent;