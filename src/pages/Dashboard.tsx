import React from "react";
import { Box, Stack, Typography, Card, CardContent, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";

export const Dashboard = () => {
    const { posts } = usePosts();
    const navigate = useNavigate();

    return (
        <Box p={3} maxWidth="50%" alignItems="center">
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Stack spacing={2}>
                {posts.map((post) => (
                    <Card key={post?.id}>
                        <CardContent>
                            <Link variant="h6" onClick={() => navigate(`/post/${post?.id}`)}>
                                {post.title}
                            </Link>
                            <Typography variant="body2">Posted by: {post.author?.username}</Typography>
                            <Typography variant="body2">{post.body}...</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
};