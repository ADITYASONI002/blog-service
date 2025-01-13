import { NextFunction, Request, Response } from 'express';

export default function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  console.info(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );
  console.info('Headers:', JSON.stringify(req.headers));
  console.info('Query:', JSON.stringify(req.query));
  const filteredBody = { ...req.body };
  if (filteredBody.password) {
    filteredBody.password = '********';
  }
  if (filteredBody.content && filteredBody.content.length > 100) {
    filteredBody.content = '*******************';
  }
  console.info('Body:', JSON.stringify(filteredBody));
  next();
}
