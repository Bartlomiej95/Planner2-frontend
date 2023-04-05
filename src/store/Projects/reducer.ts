

export const projectsReducer = (projects: [] = [], action: any) => {
    switch(action.type){
        case 'TYPE':
            return projects;
        default:
            return projects;
    }
}