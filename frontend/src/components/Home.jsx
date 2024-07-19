import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const Home = () => {
  useGetOtherUsers();
  const { otherUser } = useSelector((state) => state.user);
  return (
    <div className="flex justify-between min-h-screen w-[85%] mx-auto select-none">
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUser={otherUser} />
    </div>
  );
};

export default Home;
