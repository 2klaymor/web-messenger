import {socket} from "./socket";
import {messagesStore} from "../../entities/messages/messagesStore";

export function socketListeners(currentUserName) {
    socket.on("connect", () => {
        console.log("connected:", socket.id);
    });

    socket.on("message", (msg) => {
        messagesStore.getState().addMessage(msg, currentUserName);
    });

    socket.on("disconnect", () => {
        console.log("disconnected")
    });
}