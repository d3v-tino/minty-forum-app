import express, {Router} from 'express';
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute";

export const app = express();
const PORT = process.env.PORT;
const apiRouter = Router();

dotenv.config();

// Endpoints
apiRouter.use("/auth", authRouter);

app.use(cors());
app.use(express.json());
app.use("/api/v1", apiRouter);


app.listen(process.env.PORT, () => {
    console.log("Server started on port: " + PORT);
})

