import React from "react";
import { FaSearch } from "react-icons/fa";
import Cards from "./Cards";
import { useSelector } from "react-redux";
import useGetOtherUnfollowedUsers from "../hooks/useGetOtherUnfollowedUsers";
import ReactLoading from "react-loading";

const RightSidebar = () => {
  useGetOtherUnfollowedUsers();
  const { loggedInUser, otherUser } = useSelector((state) => state.user);
  if (!otherUser) {
    return (
      <div className="w-full flex justify-center">
        <ReactLoading
          type="spinningBubbles"
          color="#E9804D"
          height={"20%"}
          width={"20%"}
        />
      </div>
    ); // Display a loading state while the profile is being fetched
  }

  return (
    <div className="w-[30%] pt-1">
      {/* <div className="flex items-center gap-2 border-2 border-transparent bg-gradient-to-r from-[#1f120a] to-[#2d241f] p-3 rounded-full focus-within:border-sky-700 focus-within:bg-transparent ">
        <div>
          <FaSearch size={20} />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none"
        />
      </div> */}
      <div className="mt-4 bg-[#1f120a] rounded-xl p-3">
        <h2 className="text-xl text-[#E9804D] tracking-wider font-bold mb-6">
          People you may know
        </h2>
        {otherUser.map((user) => {
          return <Cards key={user?._id} user={user} />;
        })}
      </div>
      <div className="mt-4 bg-[#1f120a] rounded-xl p-3">
        <h2 className="text-xl tracking-wider text-[#E9804D] font-bold mb-6">
          Followings
        </h2>
        {loggedInUser?.following.map((user) => {
          return <Cards key={user?._id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default RightSidebar;
