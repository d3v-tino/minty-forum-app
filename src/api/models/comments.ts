import { api } from "../ApiClient";
import { API_ENDPOINTS } from "../endpoints";

export const getCommentsByPost = async (postId: string) => api.get(`${API_ENDPOINTS.GET_COMMENTS}/${postId}`);
