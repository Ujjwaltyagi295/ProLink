
import express, { urlencoded } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors());
app.use(urlencoded({extended:true}))
app.use(express.json());
app.use('/api/auth', authRoutes);



export default app;
