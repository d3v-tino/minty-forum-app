import { Router } from "express";
import { getCurrentUser } from "../controllers/userController";
import { Request, Response } from "express";

const userRouter = Router();

userRouter.get("/:id", async (req: Request, res: Response) => { await getCurrentUser(req, res);});

export default userRouter;