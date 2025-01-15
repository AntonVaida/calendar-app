"use client"
import React, {FC} from "react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Provider } from 'react-redux'
import { store } from "../store";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers:FC<ProvidersProps> = ({children}) => {
  return (
    <Provider store={store}>
      <AppRouterCacheProvider 
        options={{ 
          key: 'css', 
          enableCssLayer: true 
        }}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </Provider>
  )
}