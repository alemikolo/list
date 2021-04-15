import React, { createContext, FC } from 'react';

import { AppDispatch } from './types';

const initialDispatch: AppDispatch = () => null;

export const AppDispatchContext = createContext<AppDispatch>(initialDispatch);

const { Provider: DispatchContextProvider } = AppDispatchContext;

interface AppDispatchContextProviderProps {
  value: AppDispatch;
}

export const AppDispatchProvider: FC<AppDispatchContextProviderProps> = ({
  children,
  value
}) => (
  <DispatchContextProvider value={value}>{children}</DispatchContextProvider>
);
