import {api} from "../../../shared/api/instance";

export const getContacts = async () => {
    const {data} = await api.get('/contacts');
    return data;
};