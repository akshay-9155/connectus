import React from "react";
import Avatar from "react-avatar";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
const Cards = ({ user }) => {
  return (
    <div className="flex justify-start gap-2 items-center mt-4">
      <div>
        <Link to={`/profile/${user?._id}`}>
          <Avatar
            src={
              user?.profileImage
            }
            size="40"
            round={true}
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="">
          <div className=" flex items-center gap-2">
            <span className="text-[#f0c29e] font-bold">{user?.name}</span>
            {user?.followers.length > 3 && (
              <MdVerified className="text-[#E9804D]" />
            )}
          </div>
          <Link to={`/profile/${user?._id}`}>
            <span className="cursor-pointer">{`@${user?.username}`}</span>
          </Link>
        </div>
        <div>
          <Link to={`/profile/${user?._id}`}>
            <button className="bg-[#683013] text-sm font-bold py-1 px-3 rounded-full">
              Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
