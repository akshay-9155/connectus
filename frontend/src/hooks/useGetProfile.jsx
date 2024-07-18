import axios from 'axios';
import { USER_API_ENDPOINT } from '../../utils/constants';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { getProfile } from '../redux/features/user/userSlice';
const useGetProfile = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    ;(
      async () => {
        try {
          const res = await axios.get(`${USER_API_ENDPOINT}/profile`,{withCredentials: true});
          dispatch(getProfile(res?.data?.user));
        } catch (error) {
          console.log(error);
        }
      }
    )()
  },[])
}
export default useGetProfile;