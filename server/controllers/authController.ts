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
    try {
        // Retrieve email and password from request body
        const { email, password } = req.body;

        // Check if user with email exists
        const { data, error } = await supabase
            .from("users")
            .select("id, email, password_hash") // Select only necessary fields
            .eq("email", email)
            .maybeSingle();

        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ error: "Database error" });
        }

        // If no user is found, return an error
        if (!data) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, data.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_id: data.id, email: data.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        // Remove password before sending response
        const { password_hash, ...safeUser } = data;

        console.log("200 - User logged in");
        res.status(200).json({ token, user: safeUser });

    } catch (e) {
        console.error("Login failed with error:", e);
        return res.status(500).json({ error: e || "Internal Server Error" });
    }
};


