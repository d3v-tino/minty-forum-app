import React from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import {useComments} from "../hooks/useComments";

export const CommentSection = () => {
    const { comments } = useComments("0437ee93-1dec-4881-a061-dab8fdb882cb");

    return (
        <Stack>
            <Typography>Comments</Typography>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Paper key={comment?.id} sx={{ borderRadius: 2, padding: 1, boxShadow: "none" }}>
                        <Typography>{comment.author?.username}: {comment.body}</Typography>
                    </Paper>
                ))
            ) : (
                <Typography>No comments yet</Typography>
            )}
        </Stack>

    )
};