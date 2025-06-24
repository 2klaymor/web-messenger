import {api} from "../../shared/api/instance";

export const getMessages = async (chatId) => {
    const response = await api.get(`/messages/${chatId}`);
    return response.data;
};