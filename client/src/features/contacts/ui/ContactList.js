import {useContactList} from "../model/useContactList";
import SearchField from "../../search-users/ui/SearchField";
import Contact from "./Contact";

const ContactList = () => {
    const {contacts, isLoading} = useContactList();

    return (
        <div className="contacts">

            <SearchField/>
            {isLoading ? (
                <p>загрузка</p>
                ) : (
                contacts.map((contact, index) => (
                    <Contact
                        key={index}
                        contact={contact}
                        pfp_path={"/pfp.png"}
                        // time={contact.lastMessage?.time || ""}
                        // lastMessage={contact.lastMessage?.text || ""}
                        // lastMessageReadStatus={contact.lastMessage?.seen || false}
                    />
                ))
                )
            }
        </div>
    )
}

export default ContactList;