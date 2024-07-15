import React from "react";
import Avatar from "react-avatar";
import { MdVerified } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

const Tweet = () => {
  return (
    <div className="w-full p-4 border-b-[1px] border-zinc-800">
      <div className="flex gap-2">
        <div className="h-fit">
          <Avatar
            src="https://as2.ftcdn.net/v2/jpg/02/62/24/31/1000_F_262243135_q7xBjfg02gaeD1NVfIqHBLz3qrOMFYcw.jpg"
            size="40"
            round={true}
            className="cursor-pointer"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Name</span>
            <MdVerified />
            <span className="text-zinc-400">
              Username <LuDot className="inline-block" />
            </span>
            <span className="text-zinc-400">Apr 5</span>
          </div>
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis,
              assumenda consequatur! Id obcaecati nisi repellendus laborum
              facere aut nulla temporibus? lorem100
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2 items-center text-xl px-4 ">
          <div className="cursor-pointer rounded-full hover:bg-sky-100 p-2 hover:text-sky-900">
            <FaRegComment className="" />
          </div>
          <p>0</p>
        </div>
        <div className="flex gap-2 items-center text-xl px-4 ">
          <div className="cursor-pointer rounded-full hover:bg-red-100 p-2 hover:text-red-900">
            <FaRegHeart className="" />
          </div>
          <p>0</p>
        </div>
        <div className="text-xl cursor-pointer rounded-full hover:bg-yellow-100 p-2 hover:text-yellow-900 ">
          <FaRegBookmark className="" />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
