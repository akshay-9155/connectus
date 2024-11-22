import React from "react";
import Tweet from "./Tweet";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

const Bookmark = () => {
  const { loggedInUser } = useSelector((state) => state.user);
  // console.log(loggedInUser);
  if (!loggedInUser?.bookmarks) {
    return (
      <div className="w-full flex justify-center">
        <ReactLoading
          type="spinningBubbles"
          color="#E9804D"
          height={"20%"}
          width={"20%"}
        />
      </div>
    );
  }
  if (!loggedInUser?.bookmarks?.length) {
    return (
      <div className="border-x-[1px] border-[#482f1e] w-[50%] h-screen overflow-y-auto mx-8 text-center">
        <div className=" flex px-4 py-1 items-center">
          <Link
            to="/"
            className=" cursor-pointer p-3 rounded-full hover:bg-zinc-700"
          >
            <FaArrowLeft className=" " />
          </Link>
          <h1 className="my-5 text-2xl text-[#E9804D] mx-auto cursor-default text-center uppercase font-bold tracking-wider">
            No Bookmarks Found
          </h1>
        </div>
        <p className="text-[#f0c29e] text-lg mt-2">
          You haven't bookmarked any tweets yet. Start exploring and add your
          favorites here.
        </p>
        <div className="flex w-full justify-center mt-5">
          <Link
            to="/"
            className=" text-2xl rounded-full w-fit px-8 hover:scale-110 py-3 hover:bg-[#ECD6C5] hover:text-[#1f120a]"
          >
            Explore
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="border-x-[1px] border-[#482f1e] w-[50%] h-screen overflow-y-auto mx-8">
      <div className=" flex px-4 py-1 items-center border-b-[1px] border-[#482f1e]">
        <Link
          to="/"
          className=" cursor-pointer p-3 rounded-full hover:bg-zinc-700"
        >
          <FaArrowLeft className=" " />
        </Link>
        <h1 className="my-5 text-2xl mx-auto cursor-default text-center uppercase font-bold tracking-wider">
          Your Bookmarked Tweets
        </h1>
      </div>
      <div>
        {loggedInUser?.bookmarks.map((tweet) => {
          return (
            <Tweet key={tweet?._id} tweet={tweet} loggedInUser={loggedInUser} />
          );
        })}
      </div>
    </div>
  );
};

export default Bookmark;
