import { useEffect } from "react";
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/features/tweets/tweetSlice";

const useGetTweets = async () => {
  const { refresh, isActive } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchAllTweets = async () => {
      try {
        const res = await axios.get(`${TWEET_API_ENDPOINT}/getAllTweets`, {
          withCredentials: true,
        });
        dispatch(getAllTweets(res?.data?.Tweets));
      } catch (error) {
        console.log(error);
      }
    };
    const fetchFollowingTweets = async () => {
      try {
        const res = await axios.get(
          `${TWEET_API_ENDPOINT}/getFollowingTweets`,
          {
            withCredentials: true,
          }
        );
        dispatch(getAllTweets(res?.data?.followingTweets));
      } catch (error) {
        console.log(error);
      }
    };
    isActive? fetchAllTweets() : fetchFollowingTweets()
  }, [refresh, isActive]);
};

export default useGetTweets;
