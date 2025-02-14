import { Router } from "express";
import { getCurrentUser } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/:id", async (req: Request, req: Response) => { await getCurrentUser(req, res);});

export default userRouter;