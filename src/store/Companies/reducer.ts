

export const companiesReducer = (companies: [] = [], action: any) => {
    switch(action.type){
        case 'TYPE':
            return [];
        default:
            return companies;
    }
}