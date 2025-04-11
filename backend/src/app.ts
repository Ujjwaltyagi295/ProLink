import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { APP_ORIGIN } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandle";
import authenticate from "./middlewares/authenticate";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.route";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser())


app.use("/auth", authRoutes);
app.use("/user",authenticate,userRoutes)
app.use("/sessions", authenticate, sessionRoutes);
app.use(errorHandler);

export default app;
