import {configureStore} from '@reduxjs/toolkit';
import WorkerReducer from '../feature/workers/WorkerSlice';
import WorkerTodoReducer from '../feature/workers/workerTodo/WorkerTodoSlice';
import WorkerPostReducer from '../feature/workers/workerPost/WorkerPostSlice';
import { apiSlice } from "../app/api/apiSlice"
import authReducer from '../feature/auth/authSlice'
import  CountPriceReducer  from '../feature/manager/countPriceSlice';
import projectReducer from '../feature/projects/projectSlice';
import remainderReducer from '../feature/remainder/remainderSlice';
import ideaReducer from '../feature/idea/ideaSlice';
import meetingReducer from '../feature/meeting/meetingSlice';

export default configureStore({
    reducer: {
       workerData: WorkerReducer,
       workerTodosData: WorkerTodoReducer,
       totalP :CountPriceReducer, 
       workerPostsData: WorkerPostReducer,
       projectsData:projectReducer,
       remainderData:remainderReducer,
       ideaData:ideaReducer,
       meetingData:meetingReducer,
       [apiSlice.reducerPath]: apiSlice.reducer,
       auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
    
})