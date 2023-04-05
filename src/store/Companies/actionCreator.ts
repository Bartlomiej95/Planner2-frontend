import CompaniesConst from "./constants";

interface ActionFetchAllCompanies {
    type: CompaniesConst,
    payload: {
        data: []
    }
}

export type ActionsCompanies = ActionFetchAllCompanies