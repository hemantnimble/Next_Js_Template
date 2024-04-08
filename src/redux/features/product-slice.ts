import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface ProductState {
    products: any;
    status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
}

const initialState: ProductState = {
    products:[],
    status: 'idle',
}

export const products = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.status = 'rejected';
            })
    }
})

export const getAllProducts = createAsyncThunk('products/getallproducts', async () => {
    try {
        const response = await axios.get('api/products/getallproducts',);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching products:', error);

    }
});


export const { } = products.actions;
export default products.reducer;