import { configureStore } from '@reduxjs/toolkit';
import { mockApi } from '../services/mockApi';
import { industrialApi } from '../services/industrialApi';
import { enterpriseApi } from '../services/enterpriseApi';
import authReducer from '../features/auth/authSlice';
import factoryReducer from '../features/factory/factorySlice';
import websocketMiddleware from '../middleware/websocket';
import rootReducer from './reducers';
import { rtkQueryErrorLogger } from '../middleware/errorLogger';
import { metricsCache } from '../middleware/metricsCache';

export const store = configureStore({
  reducer: {
    ...rootReducer,
    [mockApi.reducerPath]: mockApi.reducer,
    [industrialApi.reducerPath]: industrialApi.reducer,
    [enterpriseApi.reducerPath]: enterpriseApi.reducer,
    auth: authReducer,
    factory: factoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: { warnAfter: 128 },
    }).concat(
      mockApi.middleware,
      industrialApi.middleware,
      enterpriseApi.middleware,
      websocketMiddleware,
      rtkQueryErrorLogger,
      metricsCache
    ),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;