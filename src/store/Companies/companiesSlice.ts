import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import * as api from "../../api/index";
import { RootState } from '../..';
import { ICompanies, NewCompanyType } from '../../types/Companies';

export const fetchAllCompanies = createAsyncThunk(
    "companies/fetchAllCompanies",
    async () => {
        const { data } = await api.fetchAllCompanies();
        return data;
    }
);

export const createNewCompany = createAsyncThunk(
    "companies/createNewComapny",
    async (data: NewCompanyType) => {
        const response = await api.createNewCompany(data);
        console.log(response.data);
        return response.data;
    }
)

const initialState = {
    companies: [], 
    company: {},
    error: "",
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

        builder.addCase(createNewCompany.pending, (state, action) => {
            console.log("Pending");
        });

        builder.addCase(createNewCompany.rejected, (state, action) => {
            console.log("Rejected");
        });

        builder.addCase(createNewCompany.fulfilled, (state, action) => {
            console.log("Success");
            state.company = action.payload;
        });
    }
});

export const { addCompany } = companiesSlice.actions;
export const getAllCompanies = (state: RootState) => state.companiesReducer.companies;

export default companiesSlice.reducer;