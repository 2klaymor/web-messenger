import {mockContacts} from "../../../mocks/mockData";
import Contact from "./Contact";

const ContactList = () => {
    return (
        <ul className="contacts">
            {mockContacts.map((contact, index) => (
                <Contact key={index}
                         path={"/pfp.png"}
                         name={contact.name}
                         time={contact.time}
                         lastMessage={contact.lastMessage}
                         lastMessageReadStatus={contact.seen}
                />
            ))}
        </ul>
    )
}

export default ContactList;