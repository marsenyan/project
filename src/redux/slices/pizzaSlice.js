import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizzaSlice/fetchPizzasStatus', async (params) => {
        const {sortBy, order, category, search, currentPage} = params;
       const {data} =  await axios.get (
        `https://64522b38bce0b0a0f73e6343.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
       );
      return data;
    }
  )

const initialState = {
    items: [],
    status : "loading",//loading / success/ error
};

const pizzaSlice = createSlice({
    name: "pizzaSlice",
    initialState,
    reducers: {
        setItems(state, action){
            state.items = action.payload;
            state.items = [];
        },
    },
    extraReducers:{
        [fetchPizzas.pending]:(state) => {
            state.status = "loading";
        },
        [fetchPizzas.fulfilled]:(state, action) => {
            state.items = action.payload;
            state.status = "success";

        },
        [fetchPizzas.rejected]:(state) => {
            state.status = "error";
            state.items = [];
        },
    }
});
export const {setItems} = pizzaSlice.actions;
export default pizzaSlice.reducer;