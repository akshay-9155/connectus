import { useEffect } from "react"
import axios from 'axios';
import { USER_API_ENDPOINT } from "../../utils/constants";
const getTweetAuthor = async (id) => {
    useEffect(() => {
      const fetchTweetAuthor = async () => {
        try {
          const res = await axios.get(`${USER_API_ENDPOINT}/getOtherUserProfile/${id}`);
        } catch (error) {
          console.log(error);
        }
      }
      fetchTweetAuthor();
    },[])
}
export default getTweetAuthor;