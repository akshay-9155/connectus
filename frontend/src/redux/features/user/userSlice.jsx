import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedInUser: null,
        otherUser: null,
        profile: null,

    },
    reducers: {
        //  multiple actions
        getLoggedInUser: (state, action) => {
          state.loggedInUser = action.payload;
        },
        getOtherUser: (state, action) => {
          state.otherUser = action.payload;
        },
        getProfile: (state, action) => {
          state.profile = action.payload;
        },
        followingUpdate: (state, action) => {
          state.loggedInUser = action.payload;
        }

    }
})

export const { getLoggedInUser, getOtherUser, getProfile, followingUpdate } = userSlice.actions;
export default userSlice.reducer;