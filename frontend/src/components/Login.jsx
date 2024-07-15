import React, { useState } from "react";

const Login = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  const loginSignupHandler = () => {
    setHaveAccount((prevhaveAccount) => !prevhaveAccount);
  };
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex items-center justify-around gap-10 w-[80%]">
        <div className="">
          <img
            className="h-72"
            src="https://imgs.search.brave.com/JSCTdx5RmCcveSa-5gF69eVlcSf-4pr9WuYI_fLZqlE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY5MDY0Mzc3/N3R3aXR0ZXIteCUy/MGxvZ28tcG5nLXdo/aXRlLnBuZw"
            alt="x-logo"
          />
        </div>
        <div className=" flex flex-col ">
          <div className="mb-14">
            <h1 className="text-7xl tracking-tighter font-extrabold">
              Happening now.
            </h1>
          </div>
          <h1 className=" text-4xl font-bold mb-5">
            {haveAccount ? "Login" : "Register"}
          </h1>
          <form className=" flex flex-col gap-4" action="">
            {!haveAccount && (
              <>
                <input
                  className=" bg-transparent text-lg w-96 outline-none border-2 border-zinc-800 rounded-full py-2 px-5 focus-within:border-sky-500 placeholder:pl-1"
                  type="text"
                  placeholder="Name"
                />
                <input
                  className=" bg-transparent text-lg w-96 outline-none border-2 border-zinc-800 rounded-full py-2 px-5 focus-within:border-sky-500 placeholder:pl-1"
                  type="text"
                  placeholder="Username"
                />
              </>
            )}
            <input
              className=" bg-transparent text-lg w-96 outline-none border-2 border-zinc-800 rounded-full py-2 px-5 focus-within:border-sky-500 placeholder:pl-1"
              type="email"
              placeholder="Email"
            />
            <input
              className=" bg-transparent text-lg w-96 outline-none border-2 border-zinc-800 rounded-full py-2 px-5 focus-within:border-sky-500 placeholder:pl-1"
              type="password"
              placeholder="Password"
            />
            <button className="self-start w-96 px-6 py-2 text-lg font-bold rounded-full bg-sky-700">
              {haveAccount ? "Login" : "Create Account"}
            </button>
          </form>
          <h3 className="text-lg mt-2 tracking-wider">
            {haveAccount
              ? "Do not have an account? "
              : "Already have an account? "}
            <span
              onClick={loginSignupHandler}
              className=" text-sky-400 font-bold cursor-pointer"
            >
              {haveAccount ? "Register" : "Login"}
            </span>{" "}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
