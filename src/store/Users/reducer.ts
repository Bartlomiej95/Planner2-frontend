import UsersConst from "./constants";


export const usersReducer = (users: [] = [], action: any) => {
    switch(action.type){
        case UsersConst.FETCH_ALL_USERS:
            return action.payload;
        case UsersConst.CREATE_USER:
            return [...users, action.payload];
        case UsersConst.LOGOUT_USER:
            return users;
        default:
            return users;
    }
}
