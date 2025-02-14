import {Router} from "express";
import {createContent, getCommentsByPost, getPosts} from "../controllers/contentController";

export const contentRoute = Router();


contentRoute.post("/create",
    async (req: any, res: any) => { await createContent(req, res);
    });

contentRoute.get("/posts",
    async (req: any, res: any) => { await getPosts(req, res);
    });

contentRoute.get("/comments/:postId",
    async (req: any, res: any) => { await getCommentsByPost(req, res);
    });