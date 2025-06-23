import {useState} from "react";
import dayjs from "dayjs";
import {messagesStore} from "../../../entities/messages/messagesStore";
import {useSelectedContact} from "../../../entities/contacts/useSelectedContact";

//моки
export const fakeMessages = [
    "Привет, ты тут?",
    "Я думаю об этом...",
    "А если представить, что всё это сон?",
    "звучит как план.",
    "Го в доту",
    "Пойду за чаем...",
    "А ты слышала про deadin.site?",
    "Всё будет хорошо.",
    "Мне нравится, как ты кодишь",
];


export const useChatInput = () => {
    const {selectedContact} = useSelectedContact();
    const {addMessage} = messagesStore();
    const [text, setText] = useState("");

    const sendMessage = () => {
        if (!text.trim() || !selectedContact) return;

        addMessage({
            sender: 'me',
            contents: text.trim(),
            time: dayjs().format('HH:mm'),
        });

        setText('');
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return {text, setText, sendMessage, handleKeyDown};
}