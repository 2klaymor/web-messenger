import {socket} from "./socket";

export const sendMessage = (to, content) => {
    socket.emit("message", {
        to,
        content,
    });
};