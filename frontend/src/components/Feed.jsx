import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import useGetTweets from "../hooks/useGetTweets";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import ReactLoading from "react-loading";

const Feed = () => {
  const { loggedInUser, otherUser } = useSelector((state) => state.user);

  useGetTweets();
  const { allTweets } = useSelector((state) => state.tweet);

  if (!allTweets) {
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
  } else if (allTweets.length == 0) {
    return (
      <div className="border-x-[1px] border-[#482f1e] w-[50%] min-h-screen overflow-y-auto mx-8">
        <CreatePost loggedInUser={loggedInUser} />
        <div className="mt-4 bg-[#1f120a] rounded-xl p-3">
          <h2 className="text-xl text-[#E9804D] tracking-wider font-bold mb-6">
            People you may know
          </h2>
          {otherUser ? (
            otherUser.map((user) => {
              return <Cards key={user?._id} user={user} />;
            })
          ) : (
            <div className="w-full flex justify-center">
              <ReactLoading
                type="spinningBubbles"
                color="#E9804D"
                height={"20%"}
                width={"20%"}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="border-x-[1px] border-b border-[#482f1e] w-[50%] h-screen overflow-y-auto mx-8">
      <CreatePost loggedInUser={loggedInUser} />
      {allTweets.map((tweet) => {
        return (
          <Tweet key={tweet?._id} tweet={tweet} loggedInUser={loggedInUser} />
        );
      })}
    </div>
  );
};

export default Feed;
