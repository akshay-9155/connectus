import { createSlice } from "@reduxjs/toolkit";
const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    allTweets: null,
    refresh: false,
    isActive: true,
    
  },
  reducers: {
    getAllTweets: (state, action) => {
      state.allTweets = action.payload;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    }
  },
});

export const { getAllTweets, setRefresh, setIsActive } =
  tweetSlice.actions;
export default tweetSlice.reducer;