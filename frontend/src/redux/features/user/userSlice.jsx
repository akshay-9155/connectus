import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    otherUser: null,
    profile: null,
    otherUserUpdate: false,
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
    },
    setOtherUserUpdate: (state) => {
      state.otherUserUpdate = !state.otherUserUpdate;
    },
  },
});

export const {
  getLoggedInUser,
  getOtherUser,
  getProfile,
  followingUpdate,
  setOtherUserUpdate,
} = userSlice.actions;
export default userSlice.reducer;