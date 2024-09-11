import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem("user"),
    token: localStorage.getItem("token")
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        defaultState: (state) => {
            state = initialState;
        }
    }
});

export const {setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;