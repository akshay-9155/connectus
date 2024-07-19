import React from "react";
import Avatar from "react-avatar";
import { MdVerified } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { format } from "date-fns";

const Tweet = ({ tweet }) => {
  const createdAt = new Date(tweet?.createdAt);
  const formattedDate = format(createdAt, "dd-MM-yyyy");
  const formattedTime = format(createdAt, "hh:mm:ss a");
  return (
    <div className="w-full p-4 border-b-[1px] border-zinc-800">
      <div className="flex gap-2">
        <div className="h-fit">
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
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">{tweet?.author?.name}</span>
            {tweet?.author?.followers.length > 3 && (
              <MdVerified className="text-sky-500" />
            )}
            <span className="text-zinc-400">@{tweet?.author?.username}</span>
            <RxDividerVertical className="inline-block text-zinc-400" />
            <span className="text-zinc-400">{formattedDate}</span>
            <RxDividerVertical className="inline-block text-zinc-400" />
            <span className="text-zinc-400">{formattedTime}</span>
          </div>
          <div>
            <p>{tweet?.description}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2 items-center text-xl px-4 ">
          <div className="cursor-pointer rounded-full hover:bg-sky-100 p-2 hover:text-sky-900">
            <FaRegComment className="" />
          </div>
          <p>{tweet?.comments.length}</p>
        </div>
        <div className="flex gap-2 items-center text-xl px-4 ">
          <div className="cursor-pointer rounded-full hover:bg-red-100 p-2 hover:text-red-900">
            <FaRegHeart className="" />
          </div>
          <p>{tweet?.likes.length}</p>
        </div>
        <div className="text-xl cursor-pointer rounded-full hover:bg-yellow-100 p-2 hover:text-yellow-900 ">
          <FaRegBookmark className="" />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
