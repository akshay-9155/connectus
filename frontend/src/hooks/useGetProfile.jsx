import axios from 'axios';
import { USER_API_ENDPOINT } from '../../utils/constants';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getProfile } from '../redux/features/user/userSlice';
const useGetProfile = (id) => {
  const {refreshProfile, token} = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${USER_API_ENDPOINT}/getUserProfile/${id}`,
          { 
            headers: {Authorization: `Bearer ${token}`},
            withCredentials: true }
        );
        dispatch(getProfile(res?.data?.userProfile));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  },[id, refreshProfile])
}
export default useGetProfile;