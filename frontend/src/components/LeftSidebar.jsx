import React, { useState, useEffect, useRef } from "react";
import { CgMoreO } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaHome, FaUser, FaBookmark, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../../utils/constants";
import {
  getLoggedInUser,
  getOtherUser,
  getProfile,
} from "../redux/features/user/userSlice";
import { getAllTweets } from "../redux/features/tweets/tweetSlice";

const LeftSidebar = () => {
  const { loggedInUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navbarItems = [
    { name: "Home", icon: FaHome, to: "/" },
    { name: "Profile", icon: FaUser, to: `/profile/${loggedInUser?._id}` },
    { name: "Bookmarks", icon: FaBookmark, to: "/bookmarks" },
    { name: "Logout", icon: FaSignOutAlt, to: "" },
  ];

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`);
      toast.success(res?.data?.message);
      navigate("/login");
      dispatch(getLoggedInUser(null));
      dispatch(getOtherUser(null));
      dispatch(getProfile(null));
      dispatch(getAllTweets(null));
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  };

  const deleteAccount = async () => {
    try {
      const res = await axios.delete(`${USER_API_ENDPOINT}/deleteAccount`,{withCredentials: true});
      toast.success(res?.data?.message);
      navigate("/login");
      dispatch(getLoggedInUser(null));
      dispatch(getOtherUser(null));
      dispatch(getProfile(null));
      dispatch(getAllTweets(null));
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Account Deletion Failed!");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[20%]">
      <div className="w-fit p-3 rounded-full hover:bg-zinc-800">
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
              onClick={item.name === "Logout" && handleLogout}
              to={item.to}
              className="flex items-center gap-2 my-4 rounded-full w-fit pl-3 pr-4 py-2 hover:bg-zinc-800"
            >
              <item.icon size={26} />
              <span className="text-xl font-semibold">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="relative" ref={dropdownRef}>
        {/* Button to toggle dropdown */}
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 my-4 rounded-full w-fit pl-3 pr-4 py-2 hover:bg-zinc-800"
        >
          <CgMoreO size={26} />
          <span className="text-xl font-semibold">More</span>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute left-0 mt-2 bg-zinc-800 text-white rounded-lg shadow-lg z-10 w-full">
            <ul className="flex flex-col gap-1 py-2">
              <li
                onClick={deleteAccount}
                className="cursor-pointer hover:bg-zinc-700 px-4 py-2 rounded-lg"
              >
                Delete Account
              </li>
              <li
                onClick={handleLogout}
                className="cursor-pointer hover:bg-zinc-700 px-4 py-2 rounded-lg"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
