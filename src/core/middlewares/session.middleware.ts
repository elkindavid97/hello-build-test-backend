import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

export const validateSession = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const jwtByUser = req.headers.authorization ?? null;
    const jwt = jwtByUser?.split(' ').pop();

    const session = verifyToken(`${jwt}`);

    if (!session) {
      res.status(400).send('Invalid Token Session');
    }

    req.user = session;

    next();
  } catch (_error) {
    res.status(400).send('Invalid Session');
  }
};
