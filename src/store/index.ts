import { combineReducers } from 'redux';

import { usersReducer } from './Users/reducer';
import { companiesReducer } from './Companies/reducer';
import { projectsReducer } from './Projects/reducer';
import { tasksReducer } from './Tasks/reducer';



export default combineReducers({
    usersReducer,
    companiesReducer,
    projectsReducer,
    tasksReducer,
})