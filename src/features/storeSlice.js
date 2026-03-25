import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PROTOCOL = "http";
const IP_ADDRESS = "127.0.0.1";
const PORT = 3000;

const fetchDataOfUsers = createAsyncThunk("users/fetchdata", async () => {
    const users = await axios.get(`${PROTOCOL}://${IP_ADDRESS}:${PORT}/users`);
    return {
        status: users.status,
        users: users.data,
        statusText: users.statusText
    };
});

const fetchDataOfUsersWithFetch = createAsyncThunk("users/fetchdatafetch", async () => {
    const users = (await fetch(`${PROTOCOL}://${IP_ADDRESS}:${PORT}/users`, {"method": "GET", "headers": {"Content-Type": "application/json"}}));
    return {
        status: users.status,
        users: await users.json(),
        statusText: users.statusText
    };
});

const addUser = createAsyncThunk("users/adduser", async ({name}) => {
    const users = await axios.post(`${PROTOCOL}://${IP_ADDRESS}:${PORT}/users`, {name}, {"headers": {"Content-Type": "application/json"}})
    return users.data;
});

const addUserWithFetch = createAsyncThunk("users/adduserfetch", async ({name}) => {
    const users = await fetch(`${PROTOCOL}://${IP_ADDRESS}:${PORT}/users`, {"body": JSON.stringify({name}), "method": "POST", "headers": {"Content-Type": "application/json"}});
    return await users.json();
});

const apiSlice = createSlice({
    "name": "users",

    "initialState": {
        store: {
            users: [],
            error: null,
            isLoading: false,
            isSucceded: false,
            status: null,
            statusText: null
        }
    },
    "extraReducers": (module) => {
        module
        .addCase(fetchDataOfUsers.pending, (state) => {
            state.store.isLoading = true;
            state.store.error = null;
            state.store.isSucceded = false;
            state.store.status = null;
            state.store.statusText = null;
            state.store.users = [];
        })
        .addCase(fetchDataOfUsers.rejected, (state) => {
            state.store.isLoading = false;
            state.store.status = 0;
            state.store.statusText = "Network down!";
            state.store.users = [];
        })
        .addCase(fetchDataOfUsers.fulfilled, (state, actions) => {
            state.store.isLoading = false;
            state.store.error = null;
            state.store.isSucceded = true;
            state.store.status = actions.payload.status;
            state.store.statusText = actions.payload.statusText;
            state.store.users = actions.payload.users;
        })
        .addCase(fetchDataOfUsersWithFetch.pending, (state) => {
            state.store.isLoading = true;
            state.store.error = null;
            state.store.isSucceded = false;
            state.store.status = null;
            state.store.statusText = null;
            state.store.users = [];
        })
        .addCase(fetchDataOfUsersWithFetch.rejected, (state) => {
            state.store.isLoading = false;
            state.store.status = 0;
            state.store.statusText = "Network down!";
            state.store.users = [];
        })
        .addCase(fetchDataOfUsersWithFetch.fulfilled, (state, actions) => {
            state.store.isLoading = false;
            state.store.error = null;
            state.store.isSucceded = true;
            state.store.status = actions.payload.status;
            state.store.statusText = actions.payload.statusText;
            state.store.users = actions.payload.users;
        })
        // .addCase(addUser.fulfilled, (state, actions) => {
        //     state.store.users.push(actions.payload);
        // })
        // .addCase(addUserWithFetch.fulfilled, (state, actions) => {
        //     state.store.users.push(actions.payload);
        // })
    }
});

const FetchTool = new class FetchTool {
    getUserData() {
        return fetchDataOfUsers();
    }
    addUserData(name) {
        return addUser({name});
    }
};

const AxiosTool = new class AxiosTool {
    getUserData() {
        return fetchDataOfUsersWithFetch();
    }
    addUserData(name) {
        return addUserWithFetch({name});
    }
};

export { FetchTool, AxiosTool };
export default apiSlice.reducer;