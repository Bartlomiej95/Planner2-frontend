import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from './Users/usersSlice';
import companiesReducer  from './Companies/companiesSlice';
import { projectsReducer } from './Projects/reducer';
import { tasksReducer } from './Tasks/reducer';



export default combineReducers({
    usersReducer,
    companiesReducer,
    projectsReducer,
    tasksReducer,
});
