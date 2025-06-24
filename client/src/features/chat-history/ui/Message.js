import dayjs from "dayjs";
import {useAuth} from "../../../app/contexts/authContext";

export const Message = ({senderName, content, createdAt}) => {
    const {user} = useAuth();
    const isMe = senderName === user.name; // или сравни с user.name из authContext
    return (
        <div className={`message ${isMe ? "message-sent" : "message-received"}`}>
            <div className="message__content">{content}</div>
            <div className="message__time">{dayjs(createdAt).format("HH:mm")}</div>
        </div>
    );
};