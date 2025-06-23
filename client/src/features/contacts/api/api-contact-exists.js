import {api} from "../../../shared/api/instance";

export const contactExists = async (name) => {
    const res = await api.get(`/contacts/exists/${name}`);
    return res.data.exists;
};