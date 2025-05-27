const MessageSent = ({contents, time}) => {
    return (

        <div className="message message-sent">
            <div className="message-content">{contents}</div>
            <div className="message-time">{time}</div>
        </div>

    );
}

const MessageReceived = ({contents, time}) => {
    return (

        <div className="message message-received">
            <div className="message-content">{contents}</div>
            <div className="message-time">{time}</div>
        </div>

    );
}

export {MessageSent, MessageReceived};