import {api} from "../../shared/api/instance";

export const deleteAccount = async () => {
    return await api.delete("/users");
};