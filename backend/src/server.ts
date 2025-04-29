
import "dotenv/config"
import { PORT } from './constants/env';
import express, { urlencoded } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { APP_ORIGIN } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandle";
import authenticate from "./middlewares/authenticate";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.route";
import myprojectRoutes from "./routes/myproject.routes";
import projectRoutes from "./routes/projects.routes"
const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/user",authenticate,userRoutes)
app.use("/api/myprojects",authenticate,myprojectRoutes)
app.use("/api/sessions", authenticate, sessionRoutes);
app.use("/api/projects",projectRoutes)
app.use(errorHandler);

const start = async () => {
 
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
