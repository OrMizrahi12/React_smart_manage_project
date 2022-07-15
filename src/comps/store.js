import {configureStore} from '@reduxjs/toolkit';
import UserReducer from '../feature/users/UserSlice';
import workerReducer from '../feature/workers/workerSlice';
import UserTodoReducer from '../feature/users/userTodo/UserTodoSlice';
import userPostReducer from '../feature/users/userPost/userPostSlice';

export default configureStore({
    reducer: {
       workerData: workerReducer,
       userData: UserReducer,
       userTodosData: UserTodoReducer,
       userPostsData: userPostReducer
    }
})