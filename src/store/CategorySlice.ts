import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICategory } from '../interfaces/ICategory';

const URL = "https://api.escuelajs.co/api/v1/categories";

interface IStateProducts {
    isLoading: boolean;
    isError: boolean;
    categories: ICategory[];
}

const initialState: IStateProducts = {
    isLoading: false,
    isError: false,
    categories: [],
}

export const getAllCategories = createAsyncThunk(
    'categories/getAllCategories',
    async () => {
        const response = await axios.get(URL);
        return response.data;
    }
)

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
        })
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.categories = action.payload;
        })
        builder.addCase(getAllCategories.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
});


export default categorySlice.reducer;