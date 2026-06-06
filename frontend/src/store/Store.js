import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../store/slice/AuthSlice'
import roomReducer from '../store/slice/RoomSlice'
import customerReducer from '../store/slice/CustomerSlice'
import bookReducer from '../store/slice/BookSlice'
import adminReducer from '../store/slice/AdminSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        room:roomReducer,
        customer:customerReducer,
        book:bookReducer,
        admin:adminReducer

    }
})