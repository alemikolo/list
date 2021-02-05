import React, { createContext, FC } from 'react';

import { AppState, AppStore as AS, Locale, Theme } from './types';

export const initialState: AppState = {
  isAuthenticated: false,
  locale: Locale.En,
  theme: Theme.Light
};

const initialStore: AS = {
  dispatch: () => null,
  state: initialState
};

export const AppContext = createContext<AS>(initialStore);

const { Provider: ContextProvider } = AppContext;

interface ContextProviderProps {
  value: AS;
}

export const AppStateProvider: FC<ContextProviderProps> = ({
  children,
  value
}) => <ContextProvider value={value}>{children}</ContextProvider>;
