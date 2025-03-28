import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../interfaces/IUser';

const URL = "https://api.escuelajs.co/api/v1/auth";

interface IAuthState {
    token: IDataToken | null;
    user: IUser | null;
    isLoading: boolean;
    isError: boolean;
}
const token = localStorage.getItem('token');

const initialState: IAuthState = {
    token: (() => {
        if (typeof token === 'string') {
            try {
                return JSON.parse(token);
            } catch (error) {
                return null;
            }
        }
        return null;
    })(),
    user: null,
    isLoading: false,
    isError: false,
}

interface IDataToken {
    access_token: string;
    refresh_token: string;
}

export const loginHandler = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string; }) => {
        try {
            const response = await axios.post<IDataToken>(`${URL}/login`, { email, password });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, { getState }) => {
       const state = getState() as { auth: IAuthState };
       const token = state.auth.token;
       if (!token) throw new Error('No token');

       try {
        const response = await axios.get<IUser>(`${URL}/profile`, {
            headers: {
                "Authorization": `Bearer ${token.access_token}`
            }
        });
        
        return response.data;
    
       } catch (error) {
            console.log(error);
       }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            if (action.payload)
                state.user = action.payload;
            
        })
        builder.addCase(getUser.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
        // =============================================>

        builder.addCase(loginHandler.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(loginHandler.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            if (action.payload) {
                state.token = action.payload;
            }
            
            localStorage.setItem('token', JSON.stringify(action.payload));
        })
        builder.addCase(loginHandler.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })


    }
});


export default authSlice.reducer;
export const { logout } = authSlice.actions;