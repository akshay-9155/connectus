import React from "react";
import { CiImageOn } from "react-icons/ci";
import Avatar from "react-avatar";
import { useSelector } from 'react-redux';

const CreatePost = () => {
  const { loggedInUser } = useSelector((state) => state.user);
  return (
    <div className=" w-full border-b-[1px] border-zinc-800">
      <div className=" flex items-center border-b-[1px] cursor-pointer border-zinc-800 text-md">
        <div className="w-1/2 flex justify-center hover:bg-zinc-800">
          <span className=" border-b-4 border-[#1A8CF1] text-lg py-4">
            For you
          </span>
        </div>
        <div className="w-1/2 flex justify-center hover:bg-zinc-800">
          <span className="  text-lg py-4">Following</span>
        </div>
      </div>
      <div className="p-4">
        <div className="w-full flex items-center gap-2">
          <Avatar
            src={
              `${loggedInUser?.profileImage}` ||
              "https://as2.ftcdn.net/v2/jpg/02/62/24/31/1000_F_262243135_q7xBjfg02gaeD1NVfIqHBLz3qrOMFYcw.jpg"
            }
            size="40"
            round={true}
            className="cursor-pointer"
          />
          <input
            type="text"
            placeholder="What is happening?!"
            className=" w-[100%] bg-transparent text-xl outline-none border-b-[1px] border-zinc-800 py-3 placeholder:pl-1 placeholder:text-zinc-500"
          />
        </div>
        <div className=" flex justify-between items-center mt-4">
          <CiImageOn size={28} className="cursor-pointer" />
          <button className="rounded-full text-lg px-6 py-2 bg-[#1A8CD8]">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
