import React from "react";
import {Box, Stack, Typography, Card, CardContent, Link} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MAX_LENGTH = 150;

export const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Box p={3} maxWidth="50%" alignItems="center">
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Stack spacing={2}>
            </Stack>
        </Box>
    );
};