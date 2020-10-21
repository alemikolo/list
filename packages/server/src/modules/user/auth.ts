import { Response } from 'express';
import { MiddlewareFn } from 'type-graphql';
import { sign, verify } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

import environment from '@env/env';
import { Context, JwtPayload } from '@shared/types';

const {
  ACCESS_PRIVATE_KEY,
  ACCESS_PUBLIC_KEY,
  ACCESS_TOKEN_EXP,
  REFRESH_PRIVATE_KEY,
  REFRESH_PUBLIC_KEY,
  REFRESH_TOKEN_EXP
} = environment;

type Signer = (id: string, tokenVersion?: number) => string;
type Verifier = (token: string) => JwtPayload;

const createSigner = (expiration: number, key: string): Signer => (
  id: string,
  tokenVersion?: number
) => {
  const jwtid = randomBytes(32).toString('hex');
  const iat = Math.floor(new Date().getTime() / 1000);
  const exp = iat + expiration;
  const privateKey = Buffer.from(key, 'base64').toString('utf-8');

  const payload = { exp, iat, jwtid, userId: id } as JwtPayload;

  if (tokenVersion) {
    payload.tokenVersion = tokenVersion;
  }

  return sign(payload, privateKey, { algorithm: 'RS256', jwtid });
};

const createVerifier = (key: string): Verifier => (token: string) => {
  const publicKey = Buffer.from(key, 'base64').toString('utf-8');

  const payload = verify(token, publicKey);

  return payload as JwtPayload;
};

export const createAccessToken = createSigner(
  ACCESS_TOKEN_EXP,
  ACCESS_PRIVATE_KEY
);

export const createRefreshToken = createSigner(
  REFRESH_TOKEN_EXP,
  REFRESH_PRIVATE_KEY
);

export const verifyAccessToken = createVerifier(ACCESS_PUBLIC_KEY);

export const verifyRefreshToken = createVerifier(REFRESH_PUBLIC_KEY);

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const {
    req: { headers }
  } = context;

  const { authorization } = headers;

  if (!authorization) {
    throw new Error('not Authorized');
  }

  try {
    const [, token] = authorization.split(' ');

    const payload = verifyAccessToken(token);

    const { userId } = payload;
    context.user = { userId };
  } catch (error) {
    throw new Error('not Authorized');
  }

  return next();
};

export const sendRefreshToken = (res: Response, token: string) =>
  res.cookie('refreshToken', token, {
    httpOnly: true,
    path: '/api/auth/refresh-token'
  });
