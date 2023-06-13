import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [], 
    task: {},
    company: {},
    error: "",
};

export const tasksSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
      
    }
});


export default tasksSlice.reducer;