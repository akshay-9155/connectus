import React from "react";
import { CgMoreO } from "react-icons/cg";
import {Link} from 'react-router-dom';
import {
  FaHome,
  FaBell,
  FaUser,
  FaSearch,
  FaBookmark,
  FaSignOutAlt,
} from "react-icons/fa";

const LeftSidebar = () => {
  const navbarItems = [
    { name: "Home", icon: FaHome, to: '/' },
    { name: "Explore", icon: FaSearch, to: '/profile' },
    { name: "Notifications", icon: FaBell, to: '/profile' },
    { name: "Profile", icon: FaUser, to: '/profile' },
    { name: "Bookmarks", icon: FaBookmark, to: '/profile' },
    { name: "Logout", icon: FaSignOutAlt, to: '/login' },
    { name: "More", icon: CgMoreO, to: '/profile' },
  ];

  return (
    <div className=" w-[20%]">
      <div className=" w-fit p-3 rounded-full hover:bg-zinc-800">
        <Link to="/">
          <img
            src="https://imgs.search.brave.com/JSCTdx5RmCcveSa-5gF69eVlcSf-4pr9WuYI_fLZqlE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY5MDY0Mzc3/N3R3aXR0ZXIteCUy/MGxvZ28tcG5nLXdo/aXRlLnBuZw"
            alt="x-logo"
            className="h-6"
          />
        </Link>
      </div>
      <ul>
        {navbarItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className="flex items-center gap-2 my-2 rounded-full w-fit pl-3 pr-4 py-2 hover:bg-zinc-800 "
            >
              <item.icon size={26} />
              <span className="text-xl font-semibold">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <button className="bg-[#1A8CD8] mt-2 font-bold w-full rounded-full text-lg tracking-wider py-2 hover:bg-[#1A8CF1]">
        Post
      </button>
    </div>
  );
};

export default LeftSidebar;
