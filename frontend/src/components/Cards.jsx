import React from "react";
import Avatar from "react-avatar";
import { MdVerified } from "react-icons/md";
const Cards = ({user}) => {
  return (
    <div className="flex justify-start gap-2 items-center mt-4">
      <div>
        <Avatar
          src={user?.profileImage || "../assets/images/defaultProfileImage.jpg"}
          size="40"
          round={true}
          className="cursor-pointer"
        />
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="">
          <div className=" flex items-center gap-2">
            <span>{user?.name}</span>
            {user?.followers.length > 1 && (
              <MdVerified className="text-sky-400" />
            )}
          </div>
          <span>{`@${user?.username}`}</span>
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
