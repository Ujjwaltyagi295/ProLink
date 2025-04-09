import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { APP_ORIGIN } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandle";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser())


app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
