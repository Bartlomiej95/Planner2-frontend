import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/index";
import { ActivationUser, IUser } from "../../types/Users";

export const createNewUser = createAsyncThunk(
    "users/createNewUser",
    async (email: string) => {
        try{
            const { data } = await api.createNewUser(email);
            return data;
        }catch(err){
            console.error(err);
        }
    }
);

export const activateNewUser = createAsyncThunk(
    "users/activateNewUser",
    async (activateData: ActivationUser) => {
        try {
            const { data } = await api.activateNewUser(activateData);
            return data;
            
        } catch (error) {
            console.log(error);
        }
    }
)

export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (loginData: { email: string, password: string}) => {
        try {
            const { data } = await api.login(loginData);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchUsersFromCompany = createAsyncThunk(
    "users/fetchUsersFromCompany",
    async () => {
        try {
            const { data } = await api.fetchUsersFromCompany();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);


const initialState = {
    usersInCompany: [] as IUser[],
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


        builder.addCase(activateNewUser.pending, (state, action) => {
            console.log("Pending");
        });
        builder.addCase(activateNewUser.rejected, (state, action) => {
            console.log("Rejected");
            state.error = action.payload as string;
        });
        builder.addCase(activateNewUser.fulfilled, (state, action) => {
            state.user = action.payload as {};
        });


        builder.addCase(loginUser.pending, (state, action) => {
            console.log("Pending");
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log("Rejected");
            state.error = action.payload as string;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if(action.payload.message){
                state.error = action.payload.message;
                return;
            }
            state.user = action.payload as {};
            state.error = "";
        });

        builder.addCase(fetchUsersFromCompany.pending, (state, action) => {
            console.log("Pending");
        });
        builder.addCase(fetchUsersFromCompany.rejected, (state, action) => {
            console.log("Rejected");
            state.error = action.payload as string;
        });
        builder.addCase(fetchUsersFromCompany.fulfilled, (state, action) => {
            state.usersInCompany = action.payload;
        });
    }
});

export default usersSlice.reducer;