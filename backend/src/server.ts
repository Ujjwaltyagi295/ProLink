
import app from './app';
import "dotenv/config"

const PORT = process.env.PORT || 5000;

const start = async () => {
 
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
