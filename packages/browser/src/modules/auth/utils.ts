import jwtDecode from 'jwt-decode';

import { getAccessToken } from './token';

export const isTokenExpired = (token: string): boolean => {
  const { exp } = jwtDecode(token);

  return Date.now() >= exp * 1000;
};

export const refreshToken = (): Promise<Response> =>
  fetch('http://localhost:5000/api/auth/refresh-token', {
    credentials: 'include',
    method: 'POST'
  });

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();

  return typeof token === 'string' && !isTokenExpired(token);
};
