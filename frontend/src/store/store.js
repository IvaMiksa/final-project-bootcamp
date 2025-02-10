import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js'
import generalReducer from './slices/generalSlice.js'


export default configureStore({
    reducer: {
        user: userReducer,
        general: generalReducer,
    },
})
