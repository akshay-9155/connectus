import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaRegWindowClose } from "react-icons/fa";
import { LuDot } from "react-icons/lu";

const CommentBox = ({ onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [replyTarget, setReplyTarget] = useState("");

  const comments = [
    {
      author: "john_doe",
      text: "This is a great tweet!",
      createdAt: "2024-08-30T12:34:56.789Z",
      updatedAt: "2024-08-30T12:34:56.789Z",
      likes: [],
      replies: [
        {
          author: "jane_smith",
          text: "I agree! Very insightful.",
          createdAt: "2024-08-30T13:00:00.000Z",
          updatedAt: "2024-08-30T12:34:56.789Z",
          likes: [],
        },
        {
          author: "alice_wonder",
          text: "Could you provide more examples?",
          createdAt: "2024-08-30T13:15:20.000Z",
          updatedAt: "2024-08-30T12:34:56.789Z",
          likes: [],
        },
      ],
    },
    {
      author: "alice_wonder",
      text: "Interesting perspective, but I disagree. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla quo mollitia non porro inventore dolorum dignissimos ad velit officia, voluptatibus, ipsam ex molestiae temporibus ullam libero? Laborum consequuntur eum harum error repudiandae voluptates ab. Rem nesciunt sequi doloribus commodi impedit, reiciendis sunt soluta aliquam veritatis quas. Commodi laudantium quo sunt.",
      createdAt: "2024-08-30T14:22:33.444Z",
      replies: [
        {
          author: "bob_brown",
          text: "What specifically do you disagree with?",
          createdAt: "2024-08-30T14:45:00.000Z",
        },
        {
          author: "john_doe",
          text: "Can you clarify your points of disagreement?",
          createdAt: "2024-08-30T15:00:00.000Z",
        },
      ],
    },
    {
      author: "bob_brown",
      text: "Can you elaborate more on this topic?",
      createdAt: "2024-08-30T15:10:20.555Z",
      replies: [
        {
          author: "john_doe",
          text: "Sure, I'll provide more details soon.",
          createdAt: "2024-08-30T15:30:45.666Z",
        },
        {
          author: "jane_smith",
          text: "Looking forward to the details!",
          createdAt: "2024-08-30T15:45:00.000Z",
        },
      ],
    },
  ];

  const handleReplyClick = (author) => {
    setReplyTarget(author);
    setInputValue(`@${author} `);
  };

  const handlePostComment = () => {
    // Add functionality to post the comment
    console.log(replyTarget);
    setInputValue("");
    setReplyTarget("");
  };

  return (
    <div className="mt-2 bg-zinc-900 text-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center ">
        <span className="text-lg font-semibold">Comments</span>
        <span
          onClick={onClose}
          className="text-red-400 text-2xl cursor-pointer"
        >
          <FaRegWindowClose />
        </span>
      </div>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <SingleComment
            comment={comment}
            index={index}
            key={index}
            onReplyClick={handleReplyClick}
          />
        ))}
      </div>

      {/* Add Comment */}
      <div className="add-comment-field flex items-center mt-4">
        <input
          type="text"
          id="input-area"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-transparent text-sm outline-none border-b border-gray-700 py-2 placeholder:text-gray-400"
          placeholder="Add a comment..."
        />
        <button
          onClick={handlePostComment}
          className="rounded-full h-8 text-sm ml-2 px-3 bg-blue-600 text-white hover:bg-blue-700"
        >
          Post
        </button>
      </div>
      <span className="text-gray-500 cursor-pointer mt-2 block text-sm">
        Load more ...
      </span>
    </div>
  );
};

const SingleComment = ({ comment, index, onReplyClick }) => {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <div key={index} className="py-2 border-b border-gray-700">
      <div className="flex justify-between items-start">
        <p className="text-sm text-gray-200">
          @{comment.author} <LuDot className="inline text-gray-500" />
          <span className="ml-1">{comment.text}</span>
        </p>
        <div className="ml-2 text-red-400">
          <FaRegHeart />
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-1">
        <span>1d</span> · <span>2000 likes</span> ·{" "}
        <label onClick={() => onReplyClick(comment.author)} htmlFor="input-area">
          Reply
        </label>
      </div>
      <div>
        <span
          onClick={() => setShowReplies(!showReplies)}
          className="text-blue-500 cursor-pointer text-sm mt-1 block"
        >
          {showReplies ? "— Hide replies" : "— View replies"}
        </span>
      </div>
      {showReplies && (
        <div className="ml-5 mt-2 space-y-2">
          {comment.replies.map((reply, index) => (
            <div key={index} className="py-2 border-b border-gray-700">
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-300">
                  @{reply.author} <LuDot className="inline text-gray-500" />
                  <span className="ml-1">{reply.text}</span>
                </p>
                <div className="ml-2 text-blue-500 cursor-pointer">
                  <FaRegHeart />
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                <span>1d</span> · <span>2000 likes</span> ·{" "}
                <label
                  onClick={() => onReplyClick(reply.author)}
                  htmlFor="input-area"
                >
                  Reply
                </label>
              </div>
            </div>
          ))}
          <span className="text-gray-500 cursor-pointer mt-2 block text-sm">
            Load more ...
          </span>
        </div>
      )}
    </div>
  );
};

export default CommentBox;
