import React from "react";
import {useNavigate} from "react-router-dom";
import {usePosts} from "../hooks/usePosts";
import { Card, CardContent, Container, Link, Stack, Typography } from "@mui/material";
import {CommentSection} from "../components/CommentSection";

export const Post = () => {
    const { posts } = usePosts();
    const post = posts[0];

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Stack spacing={2}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" >{post?.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: "inline" }}>
                            Posted by: {" "}
                        </Typography>
                        <Link
                            style={{ textDecoration: "none", cursor: "pointer" }}
                        >
                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                color="primary"
                                sx={{
                                    display: "inline",
                                    transition: "color 0.2s ease-in-out",
                                    "&:hover": { color: "secondary.main", textDecoration: "underline" }
                                }}
                            >
                                {post?.author?.username}
                            </Typography>
                        </Link>
                        <Typography variant="body2" >{post?.body}</Typography>
                    </CardContent>
                </Card>
                <CommentSection />
            </Stack>
        </Container>
    );
};