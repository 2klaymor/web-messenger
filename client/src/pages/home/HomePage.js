import ChatWindow from "./chat-window/ChatWindow";
import ContactList from "../../features/contacts/ui/ContactList";

const HomePage = () => {
    return (
        <div className="home">
            <ContactList/>
            <ChatWindow/>
        </div>
    )
}

export default HomePage;