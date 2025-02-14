import { Router } from "express";
import {loginUser, registerUser} from "../controllers/authController";
import { body } from "express-validator";

const authRouter = Router();


authRouter.post("/register",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    async (req: any, res: any) => { await registerUser(req, res); });

authRouter.post("/login",
    [
        //add credential checks
    ],
    async (req: any, res: any) => { await loginUser(req, res);
})

export default authRouter;