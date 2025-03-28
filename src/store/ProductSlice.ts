import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProductState } from '../interfaces/IProductState';
import axios, { AxiosError } from 'axios';
import { IProduct } from '../interfaces/IProduct';
import { IBodyProduct } from '../interfaces/IBodyProduct';
import { RootState } from './store';

const initialState: IProductState = {
    productList: [],
    product: null,
    isLoading: false,
    isError: false,
    offset: 0,
    limit: 10,
    hasMore: true,
};

const URL = 'https://api.escuelajs.co/api/v1/products';

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, { getState }) => {
        try {
            const state = getState() as RootState;
            const { limit, offset } = state.products;
            const products = await axios.get<IProduct[]>(`${URL}?offset=${offset}&limit=${limit}`);
            const transformProductList = products.data.map(product => ({ ...product, isFavorites: false }));
            return transformProductList;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            } else {
                console.log(error);
            }
        }
    }
)

export const loadMore = createAsyncThunk(
    'products/loadMore',
    async (_, { getState }) => {
        try {
            const state = getState() as RootState;
            const { limit, offset } = state.products;
            const products = await axios.get<IProduct[]>(`${URL}?offset=${offset}&limit=${limit}`);
            const transformProductList = products.data.map(product => ({ ...product, isFavorites: false }));
            return transformProductList;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            } else {
                console.log(error);
            }
        }
    }
)

export const getProduct = createAsyncThunk(
    'products/getProduct',
    async (id: string) => {
        try {
            const product = await axios.get<IProduct>(`${URL}/${id}`);
            return product.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            } else {
                console.log(error);
            }
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: number, { getState }) => {
        const state = getState() as RootState;
        if (!state.auth.token) throw new Error('No Authorization'); 
        try {
            await axios.delete(`${URL}/${id}`, {
                headers: {
                    "Authorization": `Bearer ${state.auth.token.access_token}`
                }
            });
            return id;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            } else {
                console.log(error);
            }
        }
    }
)

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData: IBodyProduct, { getState }) => {
        const state = getState() as RootState;
        if (!state.auth.token) throw new Error('No Authorization'); 
        try {
            const product = await axios.post<IProduct>(URL, { ...productData }, {
                headers: {
                    "Authorization": `Bearer ${state.auth.token.access_token}`
                }
            });
            return product.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            } else {
                console.log(error);
            }
        }
    }
)

export const editProduct = createAsyncThunk(
    'products/editProduct',
    async ({ id, title, price }: { id: string, title: string, price: number }, { getState }) => {
        const state = getState() as RootState;
        if (!state.auth.token) throw new Error('No Authorization'); 
        try {
            const product = await axios.put<IProduct>(`${URL}/${id}`, { title, price }, {
                headers: {
                    "Authorization": `Bearer ${state.auth.token.access_token}`
                }
            });
            return product.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            } else {
                console.log(error);
            }
        }
    }
)

export const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<IProduct>) => {
            const productId = action.payload.id;
            state.productList = state.productList.map(p => p.id === productId ? 
                { ...p, isFavorites: true } : 
            p);
        },
        removeFromFavorite: (state, action: PayloadAction<IProduct>) => {
            const productId = action.payload.id;
            state.productList = state.productList.map(p => p.id === productId ? 
                { ...p, isFavorites: false } 
            : p);
        },
        resetProducts: (state) => {
            state.productList = [];
            state.offset = 0;
            state.hasMore = true;
        },
        clearProductFromState: (state) => {
            state.product = null;
        }
    },

    extraReducers: (builder) => {
        // get all products ====================
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            if (action.payload) {
                state.productList = action.payload
            }
            state.offset += state.limit;
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })

        // load More ==============================
  
        builder.addCase(loadMore.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            if (action.payload) {
                if (action.payload.length < state.limit) {
                    state.hasMore = false;
                }
                state.productList = [...state.productList, ...action.payload];
                state.offset += state.limit;
            }
        })

        // get product ====================
        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            if (action.payload)
                state.product = action.payload;
        })
        builder.addCase(getProduct.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
        // create product ====================

        builder.addCase(createProduct.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            if (action.payload) {
                state.productList = [ ...state.productList, action.payload ]
            }
        })
        builder.addCase(createProduct.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })

        // editProduct ====================
        
        builder.addCase(editProduct.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            if (action.payload) {
                state.product = action.payload;
            }
        })
        builder.addCase(editProduct.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })

        // delete product =======================
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.productList = state.productList.filter(p => p.id !== action.payload)
        })
        builder.addCase(deleteProduct.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
});

export default ProductSlice.reducer;
export const {
    addToFavorite,
    removeFromFavorite,
    resetProducts,
    clearProductFromState
} = ProductSlice.actions;