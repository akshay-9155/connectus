import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        otherUser: null,
        profile: null
    },
    reducers: {
        //  multiple actions
        getUser: (state, action) => {
          state.user = action.payload;
        },
        getOtherUser: (state, action) => {
          state.otherUser = action.payload;
        },
        getProfile: (state, action) => {
          state.profile = action.payload;
        }

    }
})

export const { getUser, getOtherUser, getProfile } = userSlice.actions;
export default userSlice.reducer;