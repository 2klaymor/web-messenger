import {create} from "zustand";
import {getContacts} from "./api-get-contacts";

export const contactsStore = create((set) => ({
    contacts: [],
    isLoading: false,

    refreshContacts: async () => {
        set({isLoading: true});
        try {
            const contacts = await getContacts();
            set({contacts});
        } catch (error) {
            console.error("error loading contactsStore", error);
        } finally {
            set({isLoading: false});
        }
    },
}));