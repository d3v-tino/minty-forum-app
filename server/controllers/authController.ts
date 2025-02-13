import supabase from "../config/supabase";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import {findUserByColumn} from "../services/userService";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        const existingUser = await findUserByColumn("email", email);
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({ error: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from("users")
            .insert([{ username: username, email: email, password_hash: hashedPassword }])
            .select("*")
            .single();

        if (error) {
            console.error("Supabase error:", error.message);
            return res.status(500).json({ error: error.message });
        }
        console.log("200 - User registered");
        res.status(201).json({ message: "User registered", user: data });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const loginUser = async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await findUserByColumn("email", email);
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user?.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ user_id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        const { password_hash, ...safeUser } = user;

        console.log("200 - User logged in");
        res.status(200).json({ token, user: safeUser });

    } catch (e) {
        console.error("Login failed with error", e);
        return res.status(400).json({ error: e });
    }
};
