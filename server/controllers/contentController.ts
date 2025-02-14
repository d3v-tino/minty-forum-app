import supabase from "../config/supabase";
import { Request, Response } from "express";

export const createContent = async (req: Request, res: Response) => {

    try {
        const { body } = req.body;

        const { data, error } = await supabase
            .from("content")
            .insert([{ body }])
            .select("*");

        if (error) {
            console.error("Supabase error:", error.message);
            return res.status(500).json({ error: error.message });
        }

        console.log("201 - Content posted successfully");
        res.status(201).json({ message: "201 - Contents posted", content: data });

    } catch (e) {
        console.error("Server error:", e);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getPosts = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from("content")
            .select(`
                id,
                title,
                body,
                created_at,
                author:users (id, username)
            `)
            .not("title", "is", null);

        if (error) {
            console.error("Supabase error:", error.message);
            return res.status(500).json({ error: error.message });
        }

        console.log("200 - Retrieved posts successfully");
        return res.status(200).json({ message: "200 - Posts retrieved", posts: data });

    } catch (e) {
        console.error("Server error:", e);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
    const { postId } = req.params;
    if (!postId) return res.status(400).json({
        error: "postId is required",
    });

    try {
        const { data, error } = await supabase
            .from("content")
            .select(`
                id,
                body,
                created_at,
                author:users (id, username)
            `)
            .is("title", null);

        if (error) {
            console.error("Supabase error:", error.message);
            return res.status(500).json({ error: error.message });
        }

        console.log("200 - Retrieved comments successfully");
        return res.status(200).json({ message: "200 - Comments retrieved", data: data });

    } catch (e) {
        console.error("Server error:", e);
        return res.status(500).json({ error: "Internal server error" });
    }
};
