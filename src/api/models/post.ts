import {api} from "../ApiClient";
import {API_ENDPOINTS} from "../endpoints";

export const getallposts = async () => api.get(API_ENDPOINTS.GET_POSTS).then(r => r.json());
