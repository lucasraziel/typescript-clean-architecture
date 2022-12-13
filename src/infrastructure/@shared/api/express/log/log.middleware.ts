import { Request, Response, NextFunction } from 'express';
import logger from '../../../log/logger';

const logMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  next();
  logger.info(
    `Request received: ${request.method} ${request.originalUrl} Response: ${response.statusCode}`
  );
};

export default logMiddleware;
