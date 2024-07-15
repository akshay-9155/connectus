import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";

const Feed = () => {
  return (
    <div className="border-x-[1px] border-zinc-800 w-[50%] h-screen overflow-y-auto mx-8">
      <CreatePost />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
    </div>
  );
};

export default Feed;
