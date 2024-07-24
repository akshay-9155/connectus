import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";
import useGetOtherUnfollowedUsers from "../hooks/useGetOtherUnfollowedUsers";
import { useSelector } from "react-redux";

const Home = () => {
  useGetOtherUnfollowedUsers();
  const { otherUser } = useSelector((state) => state.user);
  return (
    <div className="flex justify-between min-h-screen w-[85%] mx-auto ">
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUser={otherUser} />
    </div>
  );
};

export default Home;
