import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const {loggedInUser} = useSelector(state => state.user);
  useEffect(()=>{
    if (!loggedInUser) {
      navigate("/login");
    }
  },[])
  return (
    <div className="flex justify-between min-h-screen w-[85%] mx-auto cursor-default">
      {loggedInUser ? (
        <>
          <LeftSidebar />
          <Outlet />
          <RightSidebar />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
