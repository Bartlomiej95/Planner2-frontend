import CompaniesConst from "./constants";


export const companiesReducer = (companies: [] = [], action: any) => {
    switch(action.type){
        case CompaniesConst.FETCH_ALL_COMPANIES:
            return action.payload;
        case CompaniesConst.CREATE_NEW_COMPANY:
            return [];
        default:
            return companies;
    }
}