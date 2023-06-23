import * as api from "../../api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITask, InitialNewTask } from "../../types/Tasks";


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
);

export const fetchAllTasks = createAsyncThunk(
    "tasks/fetchAllTasks",
    async () => {
        try {
            const { data } = await api.fetchAllTasks();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const toggleActivateTask = createAsyncThunk(
    "tasks/activateTask",
    async (id: string) => {
        try {
            const { data } = await api.toggleActivateTask(id);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const inactivateTask = createAsyncThunk(
    "tasks/inactivateTask",
    async (id: string) => {
        try {
            const { data } = await api.toggleActivateTask(id);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const finishTask = createAsyncThunk(
    "tasks/finishTask",
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await api.finishTask(id);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

type initialStateType = {
    tasks: ITask[],
    task: ITask,
    error: string,
}

const initialTask = { id:"", title:"", brief:"", guidelines:"", currentTime: 0, taskTime: 0, isActive: false, isFinish: false, project:"", user:"", company:""};

const initialState: initialStateType = {
    tasks: [], 
    task: initialTask,
    error: "",
};

export const tasksSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        closeTaskAfterLogout: (state, payload) => {
            state = {
                ...state,
                task: initialTask,
            }
        }
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

        builder.addCase(fetchAllTasks.pending, (state, action) => {
            console.log("Pending");
        });
        builder.addCase(fetchAllTasks.rejected, (state, action) => {
            console.log("Rejected");
        });
        builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
            console.log("Success");
            state.tasks = action.payload.tasks;
        });

        builder.addCase(toggleActivateTask.pending, (state, action) => {
            console.log("Pending");
        });
        builder.addCase(toggleActivateTask.rejected, (state, action) => {
            console.log("Rejected");
        });
        builder.addCase(toggleActivateTask.fulfilled, (state, action) => {
            console.log("Success");
            state.task = action.payload.task;
        });

        builder.addCase(inactivateTask.pending, (state, action) => {
            console.log("Pending");
        });
        builder.addCase(inactivateTask.rejected, (state, action) => {
            console.log("Rejected");
        });
        builder.addCase(inactivateTask.fulfilled, (state, action) => {
            console.log("Success");
            state.task = action.payload.task;
        });

        builder.addCase(finishTask.pending, (state, action) => {
            console.log("Pending");
        });
        builder.addCase(finishTask.rejected, (state, action) => {
            console.log("Rejected");
        });
        builder.addCase(finishTask.fulfilled, (state, action) => {
            console.log("Success");
        });
    }
});

export const { closeTaskAfterLogout} = tasksSlice.actions;

export default tasksSlice.reducer;