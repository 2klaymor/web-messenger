import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {contactsStore} from "../../entities/contacts/contactsStore";
import {contactExists} from "../../features/contacts/api/api-contact-exists";
import {addContact} from "../../features/contacts/api/api-add-contact";
import {removeContact} from "../../features/contacts/api/api-delete-contact";

export const useProfileModal = (userType, user) => {
    const handleInsideClick = (e) => {
        e.stopPropagation();
    };

    const navigate = useNavigate();
    const handleEdit = (onClose) => {
        navigate('/settings');
        onClose();
    };

    const {refreshContacts} = contactsStore();
    const [isContact, setIsContact] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkIfContact = async () => {
            try {
                const exists = await contactExists(user.name);
                setIsContact(exists);
            } catch (error) {
                console.error("error checking if contact", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkIfContact();
    }, [user.name]);


    const handleAdd = async() => {
        try {
            await addContact(user.name, user.displayName || user.name);
            setIsContact(true);
            refreshContacts();
        } catch (error) {
            console.error("error adding to contactsStore", error);
        }
    };

    const handleRemove = async () => {
        try {
            await removeContact(user.name);
            setIsContact(false);
            refreshContacts();
        } catch (error) {
            console.error("error removing from contactsStore", error);
        }
    };

    return {handleInsideClick, handleEdit, isContact, isLoading, handleAdd, handleRemove};
};