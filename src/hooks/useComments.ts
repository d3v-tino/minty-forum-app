import { useEffect, useState } from "react";
import { Content } from "../models/Content";
import { getCommentsByPost } from "../api/models/comments";

export const useComments = (postId: string) => {
    const [comments, setComments] = useState<Content[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadComments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getCommentsByPost(postId)
                .then(r => r.json());
            setComments(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        loadComments();
    }, [postId]);

    return { comments, loading, error };
};