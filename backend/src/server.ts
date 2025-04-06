import app from './app';
import "dotenv/config"
import { PORT } from './constants/env';


const start = async () => {
 
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
