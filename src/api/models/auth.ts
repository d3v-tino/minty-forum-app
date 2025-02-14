import { api } from "../ApiClient";
import { API_ENDPOINTS } from "../endpoints";

export const signup = async ({ email, username, password } : { email: string, username: string, password: string }) => {
    return await api.post(API_ENDPOINTS.REGISTER, { email, username, password });
};

export const signin = async ({ email, password } : { email: string, password: string }) => {
    return await api.post(API_ENDPOINTS.LOGIN, { email, password });
};