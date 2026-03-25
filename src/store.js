import { configureStore } from "@reduxjs/toolkit";
import users from "./features/storeSlice";

export default configureStore({
    "reducer": {
        users: users
    }
});