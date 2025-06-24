import {useEffect} from "react";
import {useChatHistory} from "../model/useChatHistory";
import {messagesStore} from "../../../entities/messages/messagesStore";
import {selectedContactStore} from "../../../entities/contacts/selectedContactStore";
import {Message} from "./Message";

export const ChatHistory = () => {
    const {chatHistoryRef} = useChatHistory();
    const {selectedContact} = selectedContactStore();
    const {messagesByChatId, fetchMessages} = messagesStore();

    const chatId = selectedContact?.chatId;
    const messages = chatId ? messagesByChatId[chatId] || [] : [];

    useEffect(() => {
        if (chatId) {
            fetchMessages(chatId);
        }
    }, [chatId]);

    return (
        <div className="chat__history" ref={chatHistoryRef}>
            {selectedContact && messages.length > 0 ? (
                messages.slice().reverse().map((msg, idx) => (
                    <Message key={idx} {...msg} />
                ))
            ) : (
                <div className="chat__placeholder"></div>
            )}
        </div>
    )
}