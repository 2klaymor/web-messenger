import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {contactsStore} from "../../entities/contacts/contactsStore";
// import {contactExists} from "../../features/contacts/api/api-contact-exists";
import {addContact} from "../../features/contacts/api/api-add-contact";
import {removeContact} from "../../features/contacts/api/api-delete-contact";

export const useProfileModal = (userType, user, onClose) => {
    const navigate = useNavigate();
    const {contacts, refreshContacts} = contactsStore();
    const [isLoading, setIsLoading] = useState(false);
    const isContact = contacts.some(contact => contact.name === user.name);

    const handleInsideClick = (e) => e.stopPropagation();

    const handleEdit = () => {
        navigate('/settings')
        onClose();
    };

    const handleAdd = async () => {
        setIsLoading(true);
        try {
            // await addContact('inktel');
            await addContact(user.name, user.displayName || user.name);
            await refreshContacts();
        } catch (error) {
            console.error("error adding to contactsStore", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemove = async () => {
        setIsLoading(true);
        try {
            await removeContact(user.name);
            await refreshContacts();
        } catch (error) {
            console.error("error removing from contactsStore", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {handleInsideClick, handleEdit, handleAdd, handleRemove, isContact, isLoading,};
};