import {mockContacts} from "../../../mocks/mockData";
import SearchField from "../../search-field/SearchField";
import Contact from "./Contact";

const ContactList = () => {
    return (
        <div className="contacts">

            <SearchField/>

            {mockContacts.map((contact, index) => (
                <Contact key={index}
                         path={"/pfp.png"}
                         name={contact.name}
                         time={contact.time}
                         lastMessage={contact.lastMessage}
                         lastMessageReadStatus={contact.seen}
                />
            ))}
        </div>
    )
}

export default ContactList;