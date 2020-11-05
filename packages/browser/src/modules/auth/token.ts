type accessToken = string | undefined;

let accessToken: accessToken;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token?: accessToken) => (accessToken = token);
