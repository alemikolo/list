import { TokenRefreshLink } from 'apollo-link-token-refresh';

import {
  isTokenExpired,
  refreshToken
} from '../../../../../modules/auth/utils';
import {
  getAccessToken,
  setAccessToken
} from '../../../../../modules/auth/token';

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  fetchAccessToken: refreshToken,
  handleError: err => {
    // TODO logout | redirect | etc
    console.error(err);
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    try {
      return typeof token !== 'string' || !isTokenExpired(token);
    } catch {
      return false;
    }
  }
});

export default refreshTokenLink;
