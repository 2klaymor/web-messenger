import {useChatHistory} from "../model/useChatHistory";
import {selectedContactStore} from "../../../entities/contacts/selectedContactStore";
import Message from "./Message";

export const ChatHistory = () => {
    const {chatHistoryRef, messages} = useChatHistory();
    const {selectedContact} = selectedContactStore();

    return (
        <div className="chat__history" ref={chatHistoryRef}>
            {selectedContact && messages ? (
                messages.slice().reverse().map((msg, idx) => (
                    <Message key={idx} {...msg} />
                ))
            ) : (
                <div className="chat__placeholder"></div>
            )}
        </div>
    )
}