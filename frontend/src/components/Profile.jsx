import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import useGetProfile from "../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { USER_API_ENDPOINT } from "../../utils/constants";
import { followingUpdate, setOtherUserUpdate } from "../redux/features/user/userSlice";
import ReactLoading from 'react-loading';
import EditProfile from "./EditProfile";

const Profile = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const { loggedInUser, profile } = useSelector((state) => state.user);
  const {id} = useParams();
  useGetProfile(id);
  const handleFollowUnfollow = async () => {
    try {
      const response = await axios.put(
        `${USER_API_ENDPOINT}/toggleFollow/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(followingUpdate(response?.data?.currentUser));
      dispatch(setOtherUserUpdate())
      toast.success(response?.data?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  }

  if (!profile) {
    return (
      <div className="w-full flex justify-center">
        <ReactLoading
          type="spinningBubbles"
          color="#1A8CF1"
          height={"20%"}
          width={"20%"}
        />
      </div>
    ); // Display a loading state while the profile is being fetched
  }

  return (
    <div className="border-x-[1px] border-zinc-800 w-[50%] h-screen overflow-y-auto mx-8">
      <div className=" flex gap-8 px-4 py-1 items-center">
        <Link
          to="/"
          className=" cursor-pointer p-3 rounded-full hover:bg-zinc-700"
        >
          <FaArrowLeft className=" " />
        </Link>
        <div>
          <div className="flex gap-2 items-center text-xl">
            <h3 className=" font-bold cursor-pointer">{profile.name}</h3>
            {profile?.followers.length > 3 && (
              <MdVerified className="text-sky-500" />
            )}
          </div>
          <span className="font-semibold text-zinc-500">
            {profile.tweets.length} posts
          </span>
        </div>
      </div>
      <div className="w-full min-h-32 max-h-40 overflow-hidden">
        <img
          className=""
          src={
            profile.coverImage ||
            "https://img.freepik.com/free-vector/blank-user-circles_78370-4336.jpg?t=st=1721382103~exp=1721385703~hmac=e7d40823f98d6ba1037acb35954b8d27566bf23bdc128cc3d1ca39d0c38b5ece&w=1480"
          }
          alt="cover-img"
        />
      </div>
      <div className="flex px-5 h-16 justify-between">
        <div className=" h-36 w-36 rounded-full overflow-hidden -translate-y-1/2 border-4 border-zinc-950">
          <img
            src={
              profile.profileImage ||
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.1883982623.1721382457&semt=sph"
            }
            alt="profile-photo"
          />
        </div>
        <div className="translate-y-4">
          {id === loggedInUser?._id ? (
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className=" text-zinc-50 border-[1px] border-zinc-700 text-sm font-bold py-2 px-6 rounded-full"
            >
              Edit Profile
            </button>
          ) : loggedInUser?.following.some((user) => user._id === id) ? (
            <button
              onClick={handleFollowUnfollow}
              className=" text-zinc-50 border-[1px] border-zinc-700 text-sm font-bold py-2 px-6 rounded-full"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={handleFollowUnfollow}
              className=" text-zinc-50 border-[1px] border-zinc-700 text-sm font-bold py-2 px-6 rounded-full"
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="mt-5 px-4">
        <h3 className="text-xl font-bold">{profile.name}</h3>
        <span className=" text-zinc-500">@{profile.username}</span>
        <p className="mt-5">{profile.bio || "Describe yourself here!!"}</p>
      </div>
      {isEditProfileOpen && (
        <EditProfile onClose={() => setIsEditProfileOpen(false)} profileInfo= {profile} />
      )}
    </div>
  );
};

export default Profile;
