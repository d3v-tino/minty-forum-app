import { Router } from "express";
import { createContent, getCommentsByPost, getPosts } from "../controllers/contentController";

export const contentRoute = Router();


contentRoute.post("/create",
    async (req: Request, req: Response) => { await createContent(req, res);
    });

contentRoute.get("/posts",
    async (req: Request, req: Response) => { await getPosts(req, res);
    });

contentRoute.get("/comments/:postId",
    async (req: Request, req: Response) => { await getCommentsByPost(req, res);
    });