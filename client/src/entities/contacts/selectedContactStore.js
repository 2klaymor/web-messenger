import {create} from "zustand";

export const selectedContactStore = create((set) => ({
    selectedContact: null,
    setSelectedContact: (user) => set({selectedContact: user}),
    clearSelectedContact: () => set({selectedContact: null}),
}));