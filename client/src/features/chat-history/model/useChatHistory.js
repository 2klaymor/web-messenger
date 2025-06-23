import {useEffect, useRef} from "react";
import {messagesStore} from "../../../entities/messages/messagesStore";
import {fakeMessages} from "../../send-message/model/useChatInput";
import dayjs from "dayjs";

export const useChatHistory = () => {
    // моки
    const {addMessage, messages} = messagesStore();
    useEffect(() => {
        const interval = setInterval(() => {
            const randomText = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];

            addMessage({
                sender: 'friend',
                contents: randomText,
                time: dayjs().format('HH:mm'),
            });
        }, 5000); // каждые 5 сек

        return () => clearInterval(interval);
    }, []);


    const chatHistoryRef = useRef(null);
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, []);

    return {chatHistoryRef, messages};
}