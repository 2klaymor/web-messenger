import {useContactList} from "../model/useContactList";
import SearchField from "../../search-users/ui/SearchField";
import Contact from "./Contact";

const ContactList = () => {
    const {contacts, isLoading} = useContactList();

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
                    />
                ))
            )}
        </div>
    );
};

export default ContactList;