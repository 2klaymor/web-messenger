import {createChat} from "./api-create-chat"
import {useSocket} from "../../shared/socket/useSocket";
import {selectedContactStore} from "../../entities/contacts/selectedContactStore";

export const useCreateChat = () => {
    const socket = useSocket();
    const setSelectedContact = selectedContactStore((state) => state.setSelectedContact);

    const joinChat = async (user) => {
        try {
            const {id: chatId} = await createChat(user.name);
            setSelectedContact(user, chatId);
            
            console.log("Чат создан, id:", chatId);
            socket.emit("join-chat", chatId);

            return chatId;
        } catch (error) {
            console.error("error joining", error);
            return null;
        }
    };

    return {joinChat};
};