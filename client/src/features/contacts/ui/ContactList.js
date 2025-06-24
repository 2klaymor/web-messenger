// import {createChat} from "../../join-chat/api-create-chat";
import {useCreateChat} from "../../join-chat/useCreateChat";
import {useContactList} from "../model/useContactList";
import SearchField from "../../search-users/ui/SearchField";
import Contact from "./Contact";

const ContactList = () => {
    const {contacts, isLoading} = useContactList();
    const {joinChat} = useCreateChat();

    return (
        <div className="contacts">
            <SearchField/>
            {isLoading ? (
                <p></p>
            ) : (
                contacts.map((contact, index) => (
                    <Contact
                        key={index}
                        user={contact}
                        onClick={() => {
                            joinChat(contact);
                        }}
                    />
                ))
            )}
        </div>
    );
};

export default ContactList;