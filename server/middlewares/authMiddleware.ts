import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export interface DecodedToken extends JwtPayload {
    id: string;
}

export interface DecodedToken extends JwtPayload {
    id: string;
}

interface AuthRequest extends Request {
    user?: { id: string }
}

export const authenticateUser = (req: AuthRequest , res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            res.status(401).json({ error: "Unauthorized: No token provided" });
            return;
        }

        // pulls token and decodes it
        const token = authHeader.split(" ")[1];
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing in envConfig!");
            res.status(500).json({ error: "Server misconfiguration: Missing JWT secret" });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET as string) as DecodedToken;

        req.user = { id: decoded.id };
        next();
    } catch (e) {
        res.status(401).json({ error: "Invalid or expired token", e });
        return;
    }
};