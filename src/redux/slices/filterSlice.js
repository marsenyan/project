import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    setCurrentPage: 1,
    sort: {
        name:"popularidad",
        sortProperty:"rating"
    }
};
const filterSlice = createSlice ({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;

        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.setCurrentPage = action.payload;
        }
    },
    
});


export const { setCategoryId, setSort, setCurrentPage} = filterSlice.actions; 

export default filterSlice.reducer;
