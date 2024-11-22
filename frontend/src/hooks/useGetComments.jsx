import axios from "axios";
import { TWEET_API_ENDPOINT } from "../../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "../redux/features/tweets/tweetSlice";

const useGetComments = (tweetId) => {
    const { token } = useSelector(state=>state.user);
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchComments = async () => {
          try {
            console.log(`${TWEET_API_ENDPOINT}/getComments:${tweetId}`);
            const response = await axios.get(
              `${TWEET_API_ENDPOINT}/getComments/${tweetId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
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