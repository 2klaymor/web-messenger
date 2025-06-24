import {create} from "zustand";

export const selectedContactStore = create((set) => ({
    selectedContact: null,
    setSelectedContact: (user, chatId = null) =>
        set({selectedContact: {...user, chatId}}),

    clearSelectedContact: () => set({selectedContact: null}),
}));