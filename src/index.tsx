import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import globalReducer from './state';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { api } from './state/api';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath] : api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})
setupListeners(store.dispatch)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch