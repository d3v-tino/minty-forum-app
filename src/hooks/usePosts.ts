import { useEffect, useState } from "react";
import { Content } from "../models/Content";
import { getallposts } from "../api/models/post";

export const usePosts = () => {
    const [posts, setPosts] = useState<Content[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadPosts = async () => {
        setLoading(true);
        setError(null);
      try {
          const response = await getallposts();
          setPosts(response.posts);
      } catch (e) {
          console.error(e);
      }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return { posts, loading, error };
};