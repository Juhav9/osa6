import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReduser from './notificationReducer'

const store = configureStore({
    reducer:{
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReduser
    }
})

export default store