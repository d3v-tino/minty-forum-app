import { findUserByColumn } from "../services/userService";
import { Request, Response } from "express";


export const getCurrentUser = async (req: Request, res: Response) => {
    try {
       const { id } = req.params;
        if (!id) return res.status(400).json({
            error: "Id is required",
        });

        const user = await findUserByColumn("id", id);

        if (!user) return res.status(404).json({ error: "User not found" });

        console.log("200 - User found");
        return res.status(200).json(user);

    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal server error" });
    }
};