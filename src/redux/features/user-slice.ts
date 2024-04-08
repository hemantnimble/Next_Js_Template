import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface UserState {
    user: any; // You can define a proper type for user data
    loggedIn: any; // You can define a proper type for logged in user data
    status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
}

const initialState: UserState = {
    user: null,
    loggedIn: null,
    status: 'idle',
}

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'rejected';
            })
            .addCase(getUserInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.loggedIn = action.payload; // 
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.status = 'rejected';
            })
            .addCase(signUp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.loggedIn = action.payload; // 
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = 'rejected';
            })
    }
})

export const login = createAsyncThunk('users/login', async (payload: string, { rejectWithValue }) => {
    try {
        const response = await axios.post('api/users/login', payload,);
        return response.data;
    } catch (error: any) {
        console.error('Error logging in:', error);
        if (error.response && error.response.data) {
            return rejectWithValue({ message: error.response.data.error });
        }
    }
});

export const signUp = createAsyncThunk('users/signup', async (payload: string, { rejectWithValue }) => {
    try {
        const response = await axios.post('api/users/signup', payload,);
        return response.data;
    } catch (error: any) {
        console.error('Error creating account:', error);
        if (error.response && error.response.data) {
            return rejectWithValue({ message: error.response.data.error }); // Email exists error
        }
    }
});

export const getUserInfo = createAsyncThunk('users/getInfo', async () => {
    try {
        const response = await axios.get('/api/users/getuserdata',);
        return response.data.data;
    } catch (error: any) {
        console.error('Error getting info:', error);

    }
});

export const { } = user.actions;
export default user.reducer;