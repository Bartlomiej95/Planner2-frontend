import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/index";

export const createNewUser = createAsyncThunk(
    "users/createNewUser",
    async (email: string) => {
        try{
            const { data } = await api.createNewUser(email);
            console.log("data", data);
            return data;
        }catch(err){
            console.error(err);
        }
    }
);


const initialState = {
    usersInCompany: [],
    user: {},
    error: "",
    message: "",
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            
        }
    },

    extraReducers: (builder) => {
        builder.addCase(createNewUser.pending, (state, action) => {
            console.log("Pending");
        });

        builder.addCase(createNewUser.rejected, (state, action) => {
            console.log("Rejected");
            state.error = action.payload as string;
        });

        builder.addCase(createNewUser.fulfilled, (state, action) => {
            state.message = action.payload.message;
        });
    }
});

export default usersSlice.reducer;