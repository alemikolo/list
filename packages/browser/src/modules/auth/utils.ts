import jwtDecode from 'jwt-decode';

import { getAccessToken } from './token';

interface TokenPayload {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  const { exp } = jwtDecode(token) as TokenPayload;

  return Date.now() >= exp * 1000;
};

export const refreshToken = (): Promise<Response> =>
  fetch('/api/auth/refresh-token', {
    credentials: 'include',
    method: 'POST'
  });

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();

  return typeof token === 'string' && !isTokenExpired(token);
};
