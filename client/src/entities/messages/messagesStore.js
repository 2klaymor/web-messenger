import {useContext} from "react";
import {create} from 'zustand';
import {getMessages} from "./api-get-messages";
import {useAuth} from "../../app/contexts/authContext";

export const messagesStore = create((set, get) => ({
    messagesByContact: {},
    isLoading: false,

    // загрузка чата с конкретным пользователем
    loadMessages: async (contactName) => {
        set({isLoading: true});
        try {
            const messages = await getMessages(contactName);

            set((state) => ({
                messagesByContact: {
                    ...state.messagesByContact,
                    [contactName]: messages,
                },
            }));
        } catch (error) {
            console.error("failed to load messages:", error);
        } finally {
            set({isLoading: false});
        }
    },

    addMessage: (msg, currentUserName) => {
        const contactName = msg.senderName === currentUserName
            ? msg.receiverName
            : msg.senderName;

        set((state) => {
            const prev = state.messagesByContact[contactName] || [];
            return {
                messagesByContact: {
                    ...state.messagesByContact,
                    [contactName]: [...prev, msg],
                },
            };
        });
    },
}));

// export const messagesStore = create((set) => ({
//     messages: [],
//     addMessage: (message) =>
//         set((state) => ({
//             messages: [...state.messages, message],
//         })),
// }));