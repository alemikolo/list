import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

import { getAccessToken, setAccessToken } from '../../../../modules/auth/token';

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  fetchAccessToken: () => {
    return fetch('http://localhost:4000/refresh_token', {
      credentials: 'include',
      method: 'POST'
    });
  },
  handleError: err => {
    // TODO logout | redirect | etc
    console.warn('Your refresh token is invalid.');
    console.error(err);
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }
});

export default refreshTokenLink;
