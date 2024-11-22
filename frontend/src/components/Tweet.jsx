import React, { useState } from "react";
import Avatar from "react-avatar";
import { MdVerified, MdDeleteOutline, MdDelete } from "react-icons/md";
import { FaBookmark, FaHeart, FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import axios from "axios";
import {
  timeSince,
  TWEET_API_ENDPOINT,
  USER_API_ENDPOINT,
} from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../redux/features/tweets/tweetSlice";
import { toast } from "react-hot-toast";
import { getLoggedInUser } from "../redux/features/user/userSlice";
import { showConfirm } from "react-confirm-prompt";
import CommentBox from "./CommentBox";

const Tweet = ({ tweet, loggedInUser }) => {
  // console.log(tweet);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const likeOrDislikeHandler = async () => {
    try {
      const res = await axios.put(
        `${TWEET_API_ENDPOINT}/likeordislike/${tweet?._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(setRefresh());
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const deleteTweetHandler = async () => {
    try {
      const res = await axios.delete(
        `${TWEET_API_ENDPOINT}/delete/${tweet?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(setRefresh());
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  function handleTweetDeleteConfirm() {
    showConfirm("Are you sure?", {
      description: "You want to delete the tweet?",
      type: "warning",
      icon: <MdDelete />,
      animation: "slide-up",
      confirmLabel: "DELETE TWEET",
      cancelLabel: "CANCEL",
    }).then((answer) => {
      if (answer) {
        deleteTweetHandler();
      } else return;
    });
  }
  const bookmarkHandler = async () => {
    try {
      const res = await axios.put(
        `${USER_API_ENDPOINT}/bookmark/${tweet?._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(getLoggedInUser(res?.data?.updatedUser));
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const inputBoxId = "input-box";
  return (
    <div className="w-full p-4 border-t-[1px] border-[#482f1e]">
      <div className="flex gap-2 ">
        <div className="h-fit ">
          <Avatar
            src={
              `${tweet?.author?.profileImage}` ||
              "https://as2.ftcdn.net/v2/jpg/02/62/24/31/1000_F_262243135_q7xBjfg02gaeD1NVfIqHBLz3qrOMFYcw.jpg"
            }
            size="40"
            round={true}
            className="cursor-pointer"
          />
        </div>
        <div className=" w-full ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#f0c29e]">
                {tweet?.author?.name || "Twitter User"}
              </span>
              {tweet?.author?.followers?.length > 3 && (
                <MdVerified className="text-[#E9804D]" />
              )}
              <span className="text-[#ECD6C5]">
                <span className="font-extrabold">@</span>
                {tweet?.author?.username || "twitteruser"}
              </span>
              <RxDividerVertical className="inline-block text-[#ECD6C5]" />
              <span className="text-[#ECD6C5]">
                {timeSince(tweet?.createdAt)}
              </span>
            </div>
            {tweet?.author?._id === loggedInUser?._id && (
              <div className="text-xl cursor-pointer rounded-full hover:bg-red-300 p-2 hover:text-yellow-900 ">
                <MdDeleteOutline
                  onClick={handleTweetDeleteConfirm}
                  className=" text-2xl text-red-600"
                />
              </div>
            )}
          </div>
          <div>
            <p>{tweet?.description}</p>
          </div>
          <div className="tweet-images mt-4 columns-2 pr-4 gap-4">
            {tweet?.images?.map((imageUrl, index) => (
              <div key={index} className="mb-4 break-inside-avoid">
                <img
                  className="w-full h-auto rounded-lg object-cover"
                  src={imageUrl}
                  alt={`Uploaded ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2 items-center text-xl px-4 ">
          <div
            onClick={() => setShowComments((prev) => !prev)}
            className="cursor-pointer rounded-full text-sky-500 hover:bg-sky-100 p-2 hover:text-sky-900"
          >
            <label htmlFor={inputBoxId}>
              <FaRegComment className="" />
            </label>
          </div>
          <p>{tweet?.comments?.length}</p>
        </div>
        <div className="flex gap-2 items-center text-xl px-4 ">
          <div className="cursor-pointer rounded-full hover:bg-red-100 p-2 hover:text-red-900">
            {tweet?.likes?.includes(loggedInUser?._id) ? (
              <FaHeart
                onClick={likeOrDislikeHandler}
                className=" text-red-500"
              />
            ) : (
              <FaRegHeart
                onClick={likeOrDislikeHandler}
                className=" text-red-500"
              />
            )}
            {/* <FaRegHeart onClick={likeOrDislikeHandler} className="" /> */}
          </div>
          <p>{tweet?.likes?.length}</p>
        </div>
        <div className="text-xl cursor-pointer rounded-full hover:bg-yellow-100 p-2 hover:text-yellow-900">
          {loggedInUser?.bookmarks.some(
            (bookmark) => bookmark._id === tweet._id
          ) ? (
            <FaBookmark
              onClick={bookmarkHandler}
              className=" text-yellow-500"
            />
          ) : (
            <FaRegBookmark
              onClick={bookmarkHandler}
              className=" text-yellow-500"
            />
          )}
          {/* <FaRegHeart onClick={likeOrDislikeHandler} className="" /> */}
        </div>
        {/* <div className="text-xl cursor-pointer rounded-full hover:bg-yellow-100 p-2 hover:text-yellow-900 ">
          <FaRegBookmark className="" />
        </div> */}
      </div>
      {showComments && (
        <>
          <CommentBox
            onClose={() => setShowComments(false)}
            tweet={tweet}
            inputBoxId={inputBoxId}
            loggedInUserId={loggedInUser._id}
          />
        </>
      )}
    </div>
  );
};

export default Tweet;
