import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function AuthMiddleware(
  req: Request, res: Response, next: NextFunction
) {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }

  const [, token] = req.headers.authorization.split(' ');

  try {
    const data = jwt.verify(token, 'secret');
    
    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch {
    return res.sendStatus(401);
  }
}