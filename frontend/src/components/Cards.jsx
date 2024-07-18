import React from "react";
import Avatar from "react-avatar";
import { MdVerified } from "react-icons/md";
const Cards = ({user}) => {
  return (
    <div className="flex justify-start gap-2 items-center mt-4">
      <div>
        <Avatar
          src="https://imgs.search.brave.com/xcu1eZqbAd-Q1KxKDTV7ia-3DYof-JYvHhj1d_vHz7I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85LzliL1Zp/cmF0X0tvaGxpX2lu/X1BNT19OZXdfRGVs/aGkuanBnLzUxMnB4/LVZpcmF0X0tvaGxp/X2luX1BNT19OZXdf/RGVsaGkuanBn"
          size="40"
          round={true}
          className="cursor-pointer"
        />
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="">
          <div className=" flex items-center gap-2">
            <span>{user?.name}</span>
            <MdVerified className="text-sky-400" />
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
