import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import useGetTweets from "../hooks/useGetTweets";
import { useSelector } from "react-redux";

const Feed = () => {
  const { loggedInUser } = useSelector((state) => state.user);
  useGetTweets();
  const { allTweets } = useSelector(state => state.tweet)

  if(!allTweets){
    return (
      <div>Loading</div>
    )
  }
  
  return (
    <div className="border-x-[1px] border-zinc-800 w-[50%] h-screen overflow-y-auto mx-8">
      <CreatePost loggedInUser={loggedInUser} />
      {allTweets.map((tweet) => {
        return <Tweet key={tweet?._id} tweet={tweet} loggedInUser={loggedInUser} />;
      })}
    </div>
  );
};

export default Feed;
