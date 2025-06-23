import {api} from "../../../shared/api/instance";

export const addContact = async (targetName, displayName) => {
    const {data} = await api.post(`/contacts`, {targetName, displayName});
    return data;
};