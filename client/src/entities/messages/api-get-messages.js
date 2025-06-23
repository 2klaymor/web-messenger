import {api} from "../../shared/api/instance";

export const getMessages = async (contactName) => {
    const {data} = await api.get(`/messages/${contactName}`);
    return data;
}