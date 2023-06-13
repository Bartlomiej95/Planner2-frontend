import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from './Users/usersSlice';
import companiesReducer  from './Companies/companiesSlice';
import projectsReducer from './Projects/projectsSlice';
import tasksReducer from './Tasks/tasksSlice';




export default combineReducers({
    usersReducer,
    companiesReducer,
    projectsReducer,
    tasksReducer,
});
