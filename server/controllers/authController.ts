import supabase from "../config/supabase";
import bcrypt from "bcryptjs";

export const registerUser = async (req: any, res: any) => {
    try {
        const { username, email, password } = req.body;

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

        res.status(201).json({ message: "User registered", user: data });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
