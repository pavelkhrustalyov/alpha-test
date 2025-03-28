import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import categoryReducer from './CategorySlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        auth: authReducer
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;