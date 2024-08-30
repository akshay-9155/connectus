import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import Avatar from "react-avatar";
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../../utils/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsActive, setRefresh } from "../redux/features/tweets/tweetSlice";

const CreatePost = ({ loggedInUser }) => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const postTweet = async () => {
    try {
      console.log(description);
      const res = await axios.post(
        `${TWEET_API_ENDPOINT}/create`,
        { description },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res?.data?.message);
      }
      console.log(res);
      dispatch(setRefresh());
      setDescription("");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const forYouHandler = () => {
    dispatch(setIsActive(true));
  };
  const followingHandler = () => {
    dispatch(setIsActive(false));
  };
  const { isActive } = useSelector((state) => state.tweet);
  return (
    <div className=" w-full border-b-[1px] border-zinc-800">
      <div className=" flex items-center border-b-[1px] cursor-pointer border-zinc-800 text-md">
        <div
          onClick={forYouHandler}
          className="w-1/2 flex justify-center hover:bg-zinc-800"
        >
          <span
            className={`${
              isActive ? "border-b-4 border-[#1A8CF1]" : ""
            } text-lg py-4`}
          >
            For you
          </span>
        </div>
        <div
          onClick={followingHandler}
          className="w-1/2 flex justify-center hover:bg-zinc-800"
        >
          <span
            className={`${
              !isActive ? "border-b-4 border-[#1A8CF1]" : ""
            } text-lg py-4`}
          >
            Following
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="w-full flex items-center gap-2">
          <Avatar
            src={
              `${loggedInUser?.profileImage}` ||
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.1883982623.1721382457&semt=sph"
            }
            size="40"
            round={true}
            className="cursor-pointer"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is happening?!"
            className=" w-[100%] bg-transparent text-xl outline-none border-b-[1px] border-zinc-800 py-3 placeholder:pl-1 placeholder:text-zinc-500"
          />
        </div>
        <div className=" flex justify-between items-center mt-4">
          <CiImageOn size={28} className="cursor-pointer" />
          <button
            onClick={postTweet}
            className="rounded-full text-lg px-6 py-2 bg-[#1A8CD8]"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
