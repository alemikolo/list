import {
  ActionCreator,
  ActionTypes,
  IsAuthenticatedAction,
  Locale,
  LocaleAction
} from './types';

export const setIsAuthenticated: ActionCreator = (
  payload: boolean
): IsAuthenticatedAction => ({
  payload,
  type: ActionTypes.SetIsAuthenticated
});

export const setLocale: ActionCreator = (payload: Locale): LocaleAction => ({
  payload,
  type: ActionTypes.SetLocale
});
