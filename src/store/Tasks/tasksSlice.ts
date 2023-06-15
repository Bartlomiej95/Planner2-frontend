import * as api from "../../api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialNewTask } from "../../types/Tasks";


export const createNewTask = createAsyncThunk(
    "tasks/createNewTask",
    async (taskData: InitialNewTask) => {
        try {
            const { data } = await api.createNewTask(taskData);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

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
        builder.addCase(createNewTask.pending, (state, action) => {
            console.log("Pending");
        });
        builder.addCase(createNewTask.rejected, (state, action) => {
            console.log("Rejected");
        });
        builder.addCase(createNewTask.fulfilled, (state, action) => {
            console.log("Success");
            state.task = action.payload.task;
        });
    }
});


export default tasksSlice.reducer;