import { Router } from "express";
import {registerUser} from "../controllers/authController";

const authRouter = Router();

authRouter.post("/register", async (req: any, res: any) => { registerUser(req, res); });

export default authRouter;