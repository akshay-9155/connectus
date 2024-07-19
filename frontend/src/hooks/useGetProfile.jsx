import axios from 'axios';
import { USER_API_ENDPOINT } from '../../utils/constants';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { getProfile } from '../redux/features/user/userSlice';
const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${USER_API_ENDPOINT}/getOtherUserProfile/${id}`,
          { withCredentials: true }
        );
        dispatch(getProfile(res?.data?.userProfile));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  },[id])
}
export default useGetProfile;