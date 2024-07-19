import { useEffect } from "react";
import { USER_API_ENDPOINT } from "../../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getOtherUser } from "../redux/features/user/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/getOtherUsers`, {
          withCredentials: true,
        });
        dispatch(getOtherUser(res?.data?.users));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
};

export default useGetOtherUsers;
