import { sign, verify } from 'jsonwebtoken';
import { envs } from '../../config';
import type { TokenPayload } from '../../types';

const JWT_SECRET = envs.JWT_SECRET;

const generateToken = (user: TokenPayload): string => {
  const jwt = sign(user, JWT_SECRET, { expiresIn: '48h' });
  return jwt;
};

const verifyToken = (token: string): TokenPayload => {
  const decoded = verify(token, JWT_SECRET);
  return decoded as TokenPayload;
};

export { generateToken, verifyToken };
