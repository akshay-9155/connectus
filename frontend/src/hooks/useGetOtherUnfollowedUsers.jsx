import { useEffect } from "react";
import { USER_API_ENDPOINT } from "../../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUser } from "../redux/features/user/userSlice";

const useGetOtherUnfollowedUsers = () => {
  const { loggedInUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(
          `${USER_API_ENDPOINT}/getOtherUnfollowedUsers`,
          {
            withCredentials: true,
          }
        );
        dispatch(getOtherUser(res?.data?.users));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, [loggedInUser]);
};

export default useGetOtherUnfollowedUsers;
