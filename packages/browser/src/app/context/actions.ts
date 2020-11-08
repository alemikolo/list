import { ActionCreator, ActionTypes, IsAuthenticatedAction } from './types';

export const setIsAuthenticated: ActionCreator = (
  payload: boolean
): IsAuthenticatedAction => ({
  payload,
  type: ActionTypes.SetIsAuthenticated
});
