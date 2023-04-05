import { Dispatch } from "redux";
import * as api from '../../api/index';
import { ActionsCompanies } from "./actionCreator";
import CompaniesConst from "./constants";


export const fetchAllCompanies = () => async (dispatch: Dispatch<ActionsCompanies>) => {
    try {
        const data = await api.fetchAllCompanies();

        dispatch( { type: CompaniesConst.FETCH_ALL_COMPANIES, payload: data});
    } catch (error) {
        console.log(error);
    }
}