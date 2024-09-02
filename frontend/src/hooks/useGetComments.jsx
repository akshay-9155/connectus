import axios from "axios";
import { TWEET_API_ENDPOINT } from "../../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setComments } from "../redux/features/tweets/tweetSlice";

const useGetComments = (tweetId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchComments = async () => {
          try {
            console.log(`${TWEET_API_ENDPOINT}/getComments:${tweetId}`);
            const response = await axios.get(
              `${TWEET_API_ENDPOINT}/getComments/${tweetId}`,
              {
                withCredentials: true,
              }
            );
            dispatch(setComments(response?.data?.tweet));
          } catch (error) {
            console.log(error);
          }
        };
        fetchComments();
    },[])
}

export default useGetComments;