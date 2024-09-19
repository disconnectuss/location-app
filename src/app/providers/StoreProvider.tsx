"use client"
import React, { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';

interface StoreProviderProps extends PropsWithChildren<{}> {}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return (
    <Provider store={store()}>
      {children}
    </Provider>
  );
};