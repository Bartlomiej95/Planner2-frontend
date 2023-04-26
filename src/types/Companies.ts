export type CompaniesType = {
    id: string,
    name: string,
    nip: number,
    administratorId: number,
}

export interface ICompanies {
    id: string,
    name: string,
    nip: number,
    administratorId: number,
}

export type NewCompanyType = {
    name: string,
    nip: number,
    link: string,
}