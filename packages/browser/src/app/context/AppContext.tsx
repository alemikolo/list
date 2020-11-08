import React, { createContext, FC } from 'react';

import { AppContext as AC, AppState, Locale, Theme } from 'app/context/types';

export const initialState: AppState = {
  isAuthenticated: false,
  locale: Locale.En,
  theme: Theme.Light
};

const initialContext: AC = {
  dispatch: () => null,
  state: initialState
};

export const AppContext = createContext<AC>(initialContext);

const { Provider: ContextProvider } = AppContext;

interface ContextProviderProps {
  value: AC;
}

export const Provider: FC<ContextProviderProps> = ({ children, value }) => (
  <ContextProvider value={value}>{children}</ContextProvider>
);
