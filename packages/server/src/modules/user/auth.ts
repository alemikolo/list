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

  return sign({ iat, userId: id, exp, jwtid }, privateKey, {
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

    const publicKey = Buffer.from(ACCESS_PUBLIC_KEY, 'base64').toString(
      'utf-8'
    );

    const payload = verify(token, publicKey);

    const { userId } = payload as JwtPayload;

    context.user = { userId };
  } catch (error) {
    throw new Error('not Authorized');
  }

  return next();
};
