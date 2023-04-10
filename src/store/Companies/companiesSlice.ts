import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import * as api from "../../api/index";
import { RootState } from '../..';
import { ICompanies } from '../../types/Companies';

export const fetchAllCompanies = createAsyncThunk(
    "companies/fetchAllCompanies",
    async () => {
        const { data } = await api.fetchAllCompanies();
        return data;
    }
);

const initialState = {
    companies: Array<ICompanies | []> 
};

export const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        addCompany: (state, action: PayloadAction<[]>) => {
            // state.companies = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAllCompanies.pending, (state, action) => {
            console.log("Pending");
        });

        builder.addCase(fetchAllCompanies.rejected, (state, action) => {
            console.log("Rejected");
        });

        builder.addCase(fetchAllCompanies.fulfilled, (state, action) => {
            console.log("Success");
            return { ...state, companies: action.payload}
        });
    }
});

export const { addCompany } = companiesSlice.actions;
export const getAllCompanies = (state: RootState) => state.companiesReducer.companies;

export default companiesSlice.reducer;