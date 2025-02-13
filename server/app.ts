import express, {Router} from 'express';
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";

export const app = express();
const PORT = process.env.PORT;
const apiRouter = Router();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/v1", apiRouter);

// Endpoints
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter)

if (process.env.NODE_ENV !== "test") {
    app.listen(process.env.PORT, () => {
        console.log("Server started on port: " + PORT);
    });
}



