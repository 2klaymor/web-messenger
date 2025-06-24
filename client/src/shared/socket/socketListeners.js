import {socket} from "./socket";
import {messagesStore} from "../../entities/messages/messagesStore";

export function socketListeners() {
    socket.on("connect", () => {
        console.log("connected:", socket.id);
    });

    // получаемое сообщение
    socket.on("new-message", (message) => {
        console.log("new-message:", message);

        const {chatId} = message;

        if (chatId) {
            messagesStore.getState().addMessage(chatId, message);
        } else {
            console.warn("❗ new-message без chatId:", message);
        }
    });

    socket.on("disconnect", () => {
        console.log("disconnected")
    });
}