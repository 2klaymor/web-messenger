import {socket} from "./socket";
import {messagesStore} from "../../entities/messages/messagesStore";

export function socketListeners() {
    socket.on("connect", () => {
        console.log("connected:", socket.id);
    });

    socket.on("message", () => {

    });

    socket.on("disconnect", () => {
        console.log("disconnected")
    });
}