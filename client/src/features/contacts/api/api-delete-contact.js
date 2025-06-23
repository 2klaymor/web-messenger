import {api} from "../../../shared/api/instance";

export const removeContact = async (targetName) => {
    const {data} = await api.delete(`/contacts`, {data: {targetName}});
    return data;
};