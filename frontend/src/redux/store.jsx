import {configureStore} from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import tweetSlice from './features/tweets/tweetSlice';
export const store = configureStore({
    reducer: {
        user: userSlice,
        tweet: tweetSlice
    }
})
