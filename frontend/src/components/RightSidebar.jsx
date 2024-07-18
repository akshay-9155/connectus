import React from "react";
import { FaSearch } from "react-icons/fa";
import Cards from "./Cards";
const RightSidebar = ({ otherUser }) => {
  if (!otherUser) {
    return <div>Loading...</div>; // Display a loading state while the profile is being fetched
  }

  return (
    <div className="w-[30%] pt-1">
      <div className="flex items-center gap-2 border-2 border-transparent bg-zinc-800 p-3 rounded-full focus-within:border-sky-700 focus-within:bg-transparent ">
        <div>
          <FaSearch size={20} />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none"
        />
      </div>
      <div className="mt-4 bg-zinc-900 rounded-xl p-3">
        <h2 className="text-xl tracking-wider font-bold mb-6">Who to follow</h2>
        {otherUser.map(user => {
          return <Cards key={user?._id} user = {user}/>
        })}
      </div>
    </div>
  );
};

export default RightSidebar;
