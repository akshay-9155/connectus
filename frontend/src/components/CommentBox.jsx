import React, { useState, memo } from "react";
import { FaHeart, FaRegHeart, FaRegWindowClose } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { timeSince, TWEET_API_ENDPOINT } from "../../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../redux/features/tweets/tweetSlice";

const CommentBox = ({ onClose, tweet, loggedInUserId }) => {
  const [inputValue, setInputValue] = useState("");
  const [replyTarget, setReplyTarget] = useState(tweet.author.username);
  const [type, setType] = useState("comment");
  const [commentId, setCommentId] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const handleReplyClick = (author, commentId) => {
    setReplyTarget(author);
    setType("reply");
    setCommentId(commentId);
    setInputValue(`@${author?.username} `);
  };

  const handlePostComment = async () => {
    const data = { content: inputValue.replace(/^@\S+\s*/, ""), type: type };
    if (type == "reply") {
      data.commentId = commentId;
    }
    // console.log(data);
    if (data.content.trim() == "")
      return toast.error("Comment cannot be empty!");
    try {
      const response = await axios.post(
        `${TWEET_API_ENDPOINT}/addComment/${tweet._id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(setRefresh());
      toast.success(response?.data?.message);
      // console.log(response?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      // console.log(error);
    }
    setInputValue("");
    setReplyTarget(tweet.author.username);
    setType("comment");
    setCommentId("");
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${TWEET_API_ENDPOINT}/deleteComment/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(setRefresh());
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const likeDislikeComment = async (commentId) => {
    try {
      const response = await axios.get(
        `${TWEET_API_ENDPOINT}/likeOrDislikeComment/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(setRefresh());
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="mt-2 bg-[#1f120a] p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center ">
        <span className="text-lg font-semibold text-[#f0c29e]">Comments</span>
        <span
          onClick={onClose}
          className="text-red-400 text-2xl cursor-pointer"
        >
          <FaRegWindowClose />
        </span>
      </div>
      <div className="space-y-4">
        {tweet?.comments.map((comment, index) => (
          <SingleComment
            comment={comment}
            key={index}
            onReplyClick={handleReplyClick}
            loggedInUserId={loggedInUserId}
            deleteComment={deleteComment}
            likeDislikeComment={likeDislikeComment}
          />
        ))}
      </div>

      {/* Add Comment */}
      <div className="add-comment-field flex items-center mt-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-transparent text-sm outline-none border-b border-[#482f1e] py-2 placeholder:text-[#f0c29e]"
          placeholder={`@${replyTarget}`}
        />
        <button
          onClick={handlePostComment}
          className="rounded-full h-8 text-sm ml-2 px-3 bg-[#E9804D] hover:bg-[#F9804D]"
        >
          Post
        </button>
      </div>
      {/* <span className="text-gray-500 cursor-pointer mt-2 block text-sm">
        Load more ...
      </span> */}
    </div>
  );
};

const SingleComment = memo(
  ({
    comment,
    onReplyClick,
    loggedInUserId,
    deleteComment,
    likeDislikeComment,
  }) => {
    const [showReplies, setShowReplies] = useState(false);

    return (
      <div className="py-2 border-b border-[#482f1e]">
        <div className="flex justify-between items-start">
          <p className="text-sm ">
            <span className="font-extrabold">@</span>
            {comment?.author?.username} <LuDot className="inline " />
            <span className="ml-1">{comment.content}</span>
          </p>
          <div className=" flex">
            <div
              onClick={() => likeDislikeComment(comment?._id)}
              className="ml-2 text-red-400 cursor-pointer"
            >
              {comment?.likes?.includes(loggedInUserId) ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}
            </div>
            {comment?.author?._id == loggedInUserId && (
              <div
                onClick={() => deleteComment(comment?._id)}
                className="ml-2 text-red-400 cursor-pointer"
              >
                <MdDelete />
              </div>
            )}
          </div>
        </div>
        <div className="text-xs mt-1">
          <span>{timeSince(comment.createdAt)}</span> ·{" "}
          <span>{comment?.likes?.length} likes</span> ·{" "}
          <label
            className="cursor-pointer"
            onClick={() => onReplyClick(comment.author, comment._id)}
          >
            Reply
          </label>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div>
            <span
              onClick={() => setShowReplies(!showReplies)}
              className="text-[#E9804D] cursor-pointer text-sm mt-1 block"
            >
              {showReplies
                ? "— Hide replies"
                : `— View ${comment.replies.length} replies`}
            </span>
            {showReplies && (
              <div className="ml-5 mt-2 space-y-2">
                {comment.replies.map((reply, index) => (
                  <SingleReply
                    key={index}
                    reply={reply}
                    onReplyClick={onReplyClick}
                    loggedInUserId={loggedInUserId}
                    deleteComment={deleteComment}
                    likeDislikeComment={likeDislikeComment}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

const SingleReply = memo(
  ({
    reply,
    onReplyClick,
    loggedInUserId,
    deleteComment,
    likeDislikeComment,
  }) => (
    <div className="py-2 border-b border-[#482f1e]">
      <div className="flex justify-between items-start">
        <p className="text-sm ">
          @{reply?.author?.username || "twitteruser"}{" "}
          <LuDot className="inline" />
          <span className="ml-1">{reply?.content}</span>
        </p>
        <div className=" flex">
          <div
            onClick={() => likeDislikeComment(reply?._id)}
            className="ml-2 text-red-400 cursor-pointer"
          >
            {reply?.likes?.includes(loggedInUserId) ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
          </div>
          {reply.author._id == loggedInUserId && (
            <div
              onClick={() => deleteComment(reply._id)}
              className="ml-2 text-red-400 cursor-pointer"
            >
              <MdDelete />
            </div>
          )}
        </div>
      </div>
      <div className="text-xs mt-1">
        <span>{timeSince(reply?.createdAt)}</span> ·{" "}
        <span>{reply?.likes?.length || 0} likes</span> ·{" "}
        <label
          className="cursor-pointer"
          onClick={() => onReplyClick(reply?.author, reply?._id)}
        >
          Reply
        </label>
      </div>
      {/* Render nested replies recursively */}
      {reply?.replies?.length > 0 && (
        <div className="ml-5 mt-2 space-y-2">
          {reply.replies.map((nestedReply, index) => (
            <SingleReply
              key={index}
              reply={nestedReply}
              onReplyClick={onReplyClick}
              loggedInUserId={loggedInUserId}
              deleteComment={deleteComment}
              likeDislikeComment={likeDislikeComment}
            />
          ))}
        </div>
      )}
    </div>
  )
);

export default CommentBox;
