import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

import environment from '@env/env';

const {
  ACCESS_PRIVATE_KEY,
  ACCESS_TOKEN_EXP,
  REFRESH_PRIVATE_KEY,
  REFRESH_TOKEN_EXP
} = environment;

type Signer = (id: string) => string;

const createSigner = (expiration: number, key: string): Signer => (
  id: string
): string => {
  const jwtid = randomBytes(32).toString('hex');
  const iat = Math.floor(new Date().getTime() / 1000);
  const exp = iat + expiration;
  const privateKey = Buffer.from(key, 'base64').toString('utf-8');

  return jwt.sign({ iat, userId: id, exp, jwtid }, privateKey, {
    algorithm: 'RS256',
    jwtid
  });
};

export const signAccessToken = createSigner(
  ACCESS_TOKEN_EXP,
  ACCESS_PRIVATE_KEY
);
export const signRefreshToken = createSigner(
  REFRESH_TOKEN_EXP,
  REFRESH_PRIVATE_KEY
);
