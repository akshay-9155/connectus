import React from "react";
import Avatar from "react-avatar";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
const Cards = ({user}) => {
  return (
    <div className="flex justify-start gap-2 items-center mt-4">
      <div>
        <Link to={`/profile/${user?._id}`}>
          <Avatar
          src={user?.profileImage || "../assets/images/defaultProfileImage.jpg"}
          size="40"
          round={true}
          className="cursor-pointer"
        />
        </Link>
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="">
          <div className=" flex items-center gap-2">
            <span>{user?.name}</span>
            {user?.followers.length > 1 && (
              <MdVerified className="text-sky-400" />
            )}
          </div>
          <Link to={`/profile/${user?._id}`}>
            <span className="cursor-pointer">{`@${user?.username}`}</span>
          </Link>
        </div>
        <div>
          <button className="bg-zinc-50 text-zinc-950 text-sm font-bold py-1 px-3 rounded-full">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
