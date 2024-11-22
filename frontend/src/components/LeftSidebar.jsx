import React, { useState, useEffect, useRef } from "react";
import { CgMoreO } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaHome, FaUser, FaBookmark, FaSignOutAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../../utils/constants";
import {
  getLoggedInUser,
  getOtherUser,
  getProfile,
  setToken,
} from "../redux/features/user/userSlice";
import { getAllTweets } from "../redux/features/tweets/tweetSlice";
import { showConfirm } from "react-confirm-prompt";

const LeftSidebar = () => {
  const { loggedInUser, token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navbarItems = [
    { name: "Home", icon: FaHome, to: "/" },
    { name: "Profile", icon: FaUser, to: `/profile/${loggedInUser?._id}` },
    { name: "Bookmarks", icon: FaBookmark, to: "/bookmarks" },
    { name: "Logout", icon: FaSignOutAlt, to: "" },
  ];

  function handleAccountDeleteConfirm() {
    showConfirm("Are you sure?", {
      description: "This action cannot be undone.",
      type: "warning",
      icon: <MdDelete />,
      animation: "slide-up",
      confirmLabel: "DELETE",
      cancelLabel: "CANCEL"
    }).then((answer) => {
      if (answer) {
        deleteAccount();
      } else return;
    });
  }
  function handleLogoutConfirm() {
    showConfirm("Are you sure?", {
      description: "You really want to Logout!",
      type: "info",
      icon: <FaSignOutAlt />,
      animation: "slide-up",
      confirmLabel: "LOGOUT",
      cancelLabel: "CANCEL",
      color: "orange"
    }).then((answer) => {
      if (answer) {
        handleLogout();
      } else return;
    });
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`,{withCredentials: true});
      toast.success(res?.data?.message);
      navigate("/login");
      localStorage.removeItem("persist:root");
      dispatch(getLoggedInUser(null));
      dispatch(setToken(null));
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
      const res = await axios.delete(`${USER_API_ENDPOINT}/deleteAccount`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
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
      <div className="w-fit p-3 rounded-full hover:scale-125">
        <Link to="/">
          <img src="/AppLogo.jpg" alt="x-logo" className="h-10 rounded-full" />
        </Link>
      </div>
      <ul>
        {navbarItems.map((item, index) => (
          <li key={index}>
            <Link
              onClick={item.name === "Logout" && handleLogoutConfirm}
              to={item.to}
              className="flex items-center gap-2 my-4 rounded-full w-fit pl-3 pr-4 py-2 hover:bg-[#ECD6C5] hover:text-[#1f120a]"
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
          className="flex items-center gap-2 my-4 rounded-full w-fit pl-3 pr-4 py-2 hover:bg-[#ECD6C5] hover:text-[#1f120a]"
        >
          <CgMoreO size={26} />
          <span className="text-xl font-semibold">More</span>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute left-0 mt-2 bg-[#3e2414] text-[#ECD6C5] rounded-lg shadow-lg z-10 w-full">
            <ul className="flex flex-col gap-1 py-2">
              <li
                onClick={handleAccountDeleteConfirm}
                className="cursor-pointer font-bold hover:bg-[#ECD6C5] hover:text-[#1f120a] px-4 py-2 rounded-lg"
              >
                Delete Account
              </li>
              <li
                onClick={handleLogoutConfirm}
                className="cursor-pointer font-bold hover:bg-[#ECD6C5] hover:text-[#1f120a] px-4 py-2 rounded-lg"
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
