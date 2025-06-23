import {create} from "zustand";

export const useSelectedContact = create((set) => ({
    selectedContact: null,

    setSelectedContact: (contact) => set({selectedContact: contact}),
    clearSelectedContact: () => set({selectedContact: null}),
}));