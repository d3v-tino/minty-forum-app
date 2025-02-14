import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Stack } from "@mui/material";
import  { useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        navigate("/");
    };

    return (
        <Container maxWidth="sm">
            <Box>
                <Stack spacing={4}>
                    <Typography></Typography>
                    <TextField value={username} label="Username" onChange={(e) => setUsername(e.target.value)} />
                    <TextField value={email} label="Email" onChange={(e) => setEmail(e.target.value)} />
                    <TextField value={password} label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button variant="contained" onClick={handleRegister}>Register</Button>
                </Stack>
            </Box>
        </Container>
    );
};