import {useState} from "react";
import dayjs from "dayjs";
import {messagesStore} from "../../../entities/messages/messagesStore";
import {selectedContactStore} from "../../../entities/contacts/selectedContactStore";
import {socket} from "../../../shared/socket/socket";
import {useAuth} from "../../../app/contexts/authContext";

export const useChatInput = () => {
    const {selectedContact} = selectedContactStore();
    const {addMessage} = messagesStore();
    const [text, setText] = useState("");
    const {user} = useAuth();

    const sendMessage = () => {
        if (!text.trim() || !selectedContact) return;

        const content = text.trim(); // ← сохраняем значение локально сразу

        console.log("chatid:", selectedContact.chatId);
        console.log(content);
        console.log(user.name);

        const message = {
            chatId: selectedContact.chatId,
            content: text.trim(),
            senderName: user.name,
        };

        socket.emit("send-message", message);

        setText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return {text, setText, sendMessage, handleKeyDown};
}