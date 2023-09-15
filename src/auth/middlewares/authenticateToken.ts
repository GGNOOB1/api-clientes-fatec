import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';

export default async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const decoded = await AuthService.verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  req['payload'] = decoded;

  next();
}
