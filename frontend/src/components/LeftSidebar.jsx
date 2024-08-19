import React from "react";
import { CgMoreO } from "react-icons/cg";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaHome,
  FaBell,
  FaUser,
  FaSearch,
  FaBookmark,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../../utils/constants";
import { getLoggedInUser, getOtherUser, getProfile } from "../redux/features/user/userSlice";
import { getAllTweets } from "../redux/features/tweets/tweetSlice";

const LeftSidebar = () => {
  const {loggedInUser} = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navbarItems = [
    { name: "Home", icon: FaHome, to: "/" },
    // { name: "Explore", icon: FaSearch, to: "/profile" },
    // { name: "Notifications", icon: FaBell, to: "/profile" },
    { name: "Profile", icon: FaUser, to: `/profile/${loggedInUser?._id}` },
    { name: "Bookmarks", icon: FaBookmark, to: "/profile" },
    { name: "Logout", icon: FaSignOutAlt, to: "" },
    // { name: "More", icon: CgMoreO, to: "/profile" },
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
  }

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
              onClick={item.name === "Logout" && handleLogout}
              to={item.to}
              className="flex items-center gap-2 my-4 rounded-full w-fit pl-3 pr-4 py-2 hover:bg-zinc-800 "
            >
              <item.icon size={26} />
              <span className="text-xl font-semibold">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* <button className="bg-[#1A8CD8] mt-2 font-bold w-full rounded-full text-lg tracking-wider py-2 hover:bg-[#1A8CF1]">
        Post
      </button> */}
    </div>
  );
};

export default LeftSidebar;
