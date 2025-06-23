import {useEffect} from "react";
import {contactsStore} from "../../../entities/contacts/contactsStore";

export const useContactList = () => {
    const {contacts, isLoading, refreshContacts} = contactsStore();
    useEffect(() => {
        refreshContacts(); // при первом монтировании
    }, [refreshContacts]);


    return {contacts, isLoading};
}