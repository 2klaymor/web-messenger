import {create} from "zustand";
import {getContacts} from "../../features/contacts/api/api-get-contacts";

export const contactsStore = create((set) => ({
    contacts: [],
    isLoading: true,

    refreshContacts: async () => {
        set({isLoading: true});
        try {
            const data = await getContacts();
            set({contacts: data.map(contact => ({
                    name: contact.name,
                    displayName: contact.displayName,
                    lastSeen: contact.lastSeen ?? "",
                    bio: contact.bio ?? "",
                }))
            });
        } catch (error) {
            console.error("error loading contactsStore", error);
        } finally {
            set({isLoading: false});
        }
    },

}));