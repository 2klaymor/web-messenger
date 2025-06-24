import ChatWindow from "./chat-window/ChatWindow";
import ContactList from "../../features/contacts/ui/ContactList";
import {useEffect} from "react";
import {socketListeners} from "../../shared/socket/socketListeners";
import {socket} from "../../shared/socket/socket";
import {useAuth} from "../../app/contexts/authContext";

const HomePage = () => {


    return (
        <div className="home">
            <ContactList/>
            <ChatWindow/>
        </div>
    )
}

export default HomePage;