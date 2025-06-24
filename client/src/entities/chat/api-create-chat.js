import {api} from "../../shared/api/instance";

export const createChat = async (name) => {
    const response = await api.post('/chats', {targetName: name});
    console.log("📦 Ответ от /chats:", response.data);
    return response.data;
}