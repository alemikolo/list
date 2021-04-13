import React, { createContext, FC } from 'react';

import { AppState, Theme } from './types';

export const initialAppState: AppState = {
  isAuthenticated: false,
  locale: 'en',
  theme: Theme.Light
};

export const AppStateContext = createContext<AppState>(initialAppState);

const { Provider: StateContextProvider } = AppStateContext;
interface AppStateContextProviderProps {
  value: AppState;
}

export const AppStateProvider: FC<AppStateContextProviderProps> = ({
  children,
  value
}) => <StateContextProvider value={value}>{children}</StateContextProvider>;
