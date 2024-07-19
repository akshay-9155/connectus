import { createSlice } from "@reduxjs/toolkit";
const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    allTweets: null,
    refresh: false,
    followingTweets: null,
  },
  reducers: {
    getAllTweets: (state, action) => {
      state.allTweets = action.payload;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getFollowingTweets: (state, action) => {
      state.followingTweets = action.payload;
    },
  },
});

export const { getAllTweets,setRefresh, getFollowingTweets} = tweetSlice.actions;
export default tweetSlice.reducer;