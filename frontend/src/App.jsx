import React from "react";
import Body from "./components/Body";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className="bg-gradient-to-r from-[#1f120a] to-[#2d241f] text-[#ECD6C5] min-h-screen">
      <Body />
      <Toaster />
    </div>
  );
};

export default App;
