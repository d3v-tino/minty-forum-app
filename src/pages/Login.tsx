import React, { useState } from "react";
import { Box, Button, Container, Link, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signin } from "../api/models/auth";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await signin({ email, password })
                .then((r) => r.json());

            login(response.token);
            navigate("/");

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box>
                <Stack spacing={4} pt={8} width="100%">
                    <Typography variant="h4" align={"center"}>Login</Typography>
                    <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button variant="contained" onClick={handleLogin}>Login</Button >
                    <Link onClick={() => navigate("/register")}>Register</Link>
                </Stack>
            </Box>
        </Container>
    );
};