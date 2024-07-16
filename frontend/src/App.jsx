import React from "react";
import Body from "./components/Body";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className="bg-zinc-950 text-zinc-50 min-h-screen">
      <Body />
      <Toaster />
    </div>
  );
};

export default App;
