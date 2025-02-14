import { Router } from "express";
import { createContent, getCommentsByPost, getPosts } from "../controllers/contentController";
import { Request, Response } from "express";

export const contentRoute = Router();


contentRoute.post("/create",
    async (req: Request, res: Response) => { await createContent(req, res);
    });

contentRoute.get("/posts",
    async (req: Request, res: Response) => { await getPosts(req, res);
    });

contentRoute.get("/comments/:postId",
    async (req: Request, res: Response) => { await getCommentsByPost(req, res);
    });