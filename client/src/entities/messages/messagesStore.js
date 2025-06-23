import {create} from 'zustand';

export const messagesStore = create((set) => ({
    messages: [],
    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),
}));