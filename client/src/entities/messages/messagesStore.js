import {create} from 'zustand';
import {getMessages} from "./api-get-messages";

export const messagesStore = create((set, get) => ({
    messagesByChatId: {},

    fetchMessages: async (chatId) => {
        try {
            const data = await getMessages(chatId);
            set((state) => ({
                messagesByChatId: {
                    ...state.messagesByChatId,
                    [chatId]: data,
                },
            }));
        } catch (error) {
            console.error("Ошибка при загрузке сообщений:", error);
        }
    },

    addMessage: (chatId, message) => {
        console.log("chatid", chatId)
        set((state) => {
            const existing = state.messagesByChatId[chatId] || [];
            const updated = {
                ...state.messagesByChatId,
                [chatId]: [...existing, message],
            };
            return {messagesByChatId: updated};
        });
    }
}));