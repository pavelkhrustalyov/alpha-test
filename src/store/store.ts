import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import categoryReducer from './CategorySlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;