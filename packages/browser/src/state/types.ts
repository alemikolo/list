import { Dispatch } from 'react';

export enum Theme {
  Dark = 'Dark',
  Light = 'Light'
}

export type Locale = 'en' | 'pl';

export enum ActionTypes {
  SetIsAuthenticated = 'APP/UPDATE_IS_AUTHENTICATED',
  SetLocale = 'APP/UPDATE_LOCALE',
  SetTheme = 'APP/UPDATE_THEME'
}

export interface ThemeAction {
  type: ActionTypes.SetTheme;
  payload: Theme;
}

export interface LocaleAction {
  type: ActionTypes.SetLocale;
  payload: Locale;
}

export interface IsAuthenticatedAction {
  type: ActionTypes.SetIsAuthenticated;
  payload: boolean;
}

export interface AppState {
  isAuthenticated: boolean;
  locale: Locale;
  theme: Theme;
}

export type AppAction = LocaleAction | ThemeAction | IsAuthenticatedAction;

export type ActionCreator = (payload: any) => AppAction;

export type AppDispatch = Dispatch<AppAction>;
