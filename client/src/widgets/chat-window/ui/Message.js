const MessageSent = ({contents, time}) => {
    return (

        <div className="message message-sent">
            <div className="message__content">{contents}</div>
            <div className="message__time">{time}</div>
        </div>

    );
}

const MessageReceived = ({contents, time}) => {
    return (

        <div className="message message-received">
            <div className="message__contents">{contents}</div>
            <div className="message__time">{time}</div>
        </div>

    );
}

export {MessageSent, MessageReceived};