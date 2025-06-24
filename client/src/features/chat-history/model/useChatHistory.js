import {useEffect, useRef, useMemo} from "react";
import {socket} from "../../../shared/socket/socket";
import {messagesStore} from "../../../entities/messages/messagesStore";
import {selectedContactStore} from "../../../entities/contacts/selectedContactStore";

export const useChatHistory = () => {
    const chatHistoryRef = useRef(null);
    const {selectedContact} = selectedContactStore();
    const {messagesByChatId, fetchMessages, addMessage} = messagesStore();
    const chatId = selectedContact?.chatId;

    const messages = useMemo(
        () => (chatId ? messagesByChatId[chatId] || [] : []),
        [chatId, messagesByChatId]
    );

    // 1) При выборе контакта — получаем историю и джойнимся в комнату
    useEffect(() => {
        if (!chatId) return;
        fetchMessages(chatId);
        socket.emit("join-chat", {chatId});  // <-- обязательно в объекте
    }, [chatId, fetchMessages]);

    // 2) Ловим новые сообщения
    useEffect(() => {
        const handler = (msg) => {
            console.log("🔔 new-message:", msg);
            addMessage(msg.chatId, msg);
        };
        socket.on("new-message", handler);
        return () => {
            socket.off("new-message", handler);
        };
    }, [addMessage]);

    // 3) Авто-скролл вниз
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);

    return {chatHistoryRef, messages};
};
