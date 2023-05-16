import * as api from '../../api/index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NewProject } from "../../types/Projects";

export const createNewProject = createAsyncThunk(
    "projects/createNewProject",
    async (newProjectData: NewProject) => {
        try {
            const { data } = await api.createNewProject(newProjectData);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchAllProjects = createAsyncThunk(
    "projects/fetchAllProjects", 
    async () => {
        try {
            const { data } = await api.fetchAllProjects();
            return data.projects;
        } catch (error) {
            console.log(error);
        }
    }
)

const initialState = {
    project: {},
    projects: [],
    error: "",
}

export const projectsSlice = createSlice({
   name: "projects",
   initialState,
   reducers: {

   },

   extraReducers: (builder) => {
    builder.addCase(createNewProject.pending, (state, action) => {
        console.log("Pending");
    });
    builder.addCase(createNewProject.rejected, (state, action) => {
        console.log("Rejected");
    });
    builder.addCase(createNewProject.fulfilled, (state, action) => {
        console.log("Success");
        state.project = action.payload.data as NewProject;
    });

    builder.addCase(fetchAllProjects.pending, (state, action) => {
        console.log("Pending");
    });
    builder.addCase(fetchAllProjects.rejected, (state, action) => {
        console.log("Rejected");
    });
    builder.addCase(fetchAllProjects.fulfilled, (state, action) => {
        console.log("Success");
        state.projects = action.payload;
    });
   }
});

export default projectsSlice.reducer;