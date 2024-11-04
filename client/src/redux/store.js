import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
import logoutSlice from "./logoutSlice";
import userSlice from "./userSlice";
import campaignSlice from "./campaignSlice"

const store = configureStore({
    reducer: {
        loader: loaderSlice,
        logout: logoutSlice,
        user: userSlice,
        campaign: campaignSlice,
    },
});

export default store;