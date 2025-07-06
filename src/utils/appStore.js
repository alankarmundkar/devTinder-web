import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from './feedSlice'
import globalReducer from './globalSlice'

const appStore =  configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    global: globalReducer,
  }
})

export {appStore}