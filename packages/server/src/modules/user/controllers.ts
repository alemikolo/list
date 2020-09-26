import { Request, Response, RequestHandler } from 'express';

import User from './entity';
import { connectDB, disconnectDB } from '@db/db';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  verifyRefreshToken
} from '@modules/user/auth';

export const refreshToken: RequestHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { refreshToken } = req.cookies;

    const payload = verifyRefreshToken(refreshToken);

    const { userId, tokenVersion } = payload;

    await connectDB();

    const user = await User.findOne({ id: userId });

    await disconnectDB();

    if (!user) {
      throw new Error('not Authorized');
    }

    const { id, tokenVersion: dbTokenVersion } = user;

    if (tokenVersion !== dbTokenVersion) {
      throw new Error('not Authorized');
    }

    sendRefreshToken(res, createRefreshToken(id, dbTokenVersion));

    return res.send({ accessToken: createAccessToken(id) });
  } catch (error) {
    console.error(error);

    return res.sendStatus(401);
  }
};
