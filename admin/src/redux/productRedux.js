import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name : "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
    },
    reducers: {

        /* --->  get all subsection  <--- */

        getProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductsSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.products = action.payload;
        },
        getProductsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        /* --->  delete subsection  <--- */

        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload.id), 1
            );
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        /* --->  update subsection  <--- */

        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.products[
                state.products.findIndex(
                    (item) => item._id === action.payload.id
                    )
                ] = action.payload.user;
        },
        updateProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        /* --->  add subsection  <--- */

        addProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.products.push(action.payload);
        },
        addProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getProductsStart,
    getProductsSuccess, 
    getProductsFailure,
    deleteProductStart, 
    deleteProductSuccess, 
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;