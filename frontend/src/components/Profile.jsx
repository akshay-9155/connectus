import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="border-x-[1px] border-zinc-800 w-[50%] h-screen overflow-y-auto mx-8">
      <div className=" flex gap-8 px-4 py-1 items-center">
        <Link
          to="/"
          className=" cursor-pointer p-3 rounded-full hover:bg-zinc-700"
        >
          <FaArrowLeft className=" " />
        </Link>
        <div>
          <div className="flex gap-2 items-center text-xl">
            <h3 className=" font-bold cursor-pointer">Ravish Kumar</h3>
            <MdVerified className=" text-sky-500" />
          </div>
          <span className="font-semibold text-zinc-500">100 posts</span>
        </div>
      </div>
      <div className="w-full">
        <img
          src="https://pbs.twimg.com/profile_banners/930267858227019776/1589661418/1080x360"
          alt="banner-img"
        />
      </div>
      <div className="flex px-5 h-16 justify-between">
        <div className=" h-36 w-36 rounded-full overflow-hidden -translate-y-1/2 border-4 border-zinc-950">
          <img
            src="https://pbs.twimg.com/profile_images/1263137854416437254/Rr9nuVIu_400x400.jpg"
            alt="profile-photo"
          />
        </div>
        <div className="translate-y-4">
          <button className=" text-zinc-50 border-[1px] border-zinc-700 text-sm font-bold py-2 px-6 rounded-full">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="mt-5 px-4">
        <h3 className="text-xl font-bold">Akshay Anand</h3>
        <span className=" text-zinc-500">@Username</span>
        <p className="mt-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, iusto distinctio non officiis aliquid quasi qui dolorum rerum quae placeat!</p>
      </div>
    </div>
  );
};

export default Profile;
