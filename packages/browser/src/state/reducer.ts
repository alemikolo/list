import { Reducer } from 'react';

import { AppState, AppAction, ActionTypes } from './types';

const appReducer: Reducer<AppState, AppAction> = (state, action): AppState => {
  switch (action.type) {
    case ActionTypes.SetIsAuthenticated:
      return { ...state, isAuthenticated: action.payload };
    case ActionTypes.SetLocale:
      return { ...state, locale: action.payload };
    case ActionTypes.SetTheme:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export default appReducer;
