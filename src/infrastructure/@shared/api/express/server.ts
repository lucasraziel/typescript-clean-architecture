import dotenv from 'dotenv';
import { app } from './app';
import logger from '../../log/logger';

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});
