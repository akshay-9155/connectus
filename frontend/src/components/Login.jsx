import React, { useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/constants.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  // State to check whether user has an accout or not in order to toggle between login and signup
  const [haveAccount, setHaveAccount] = useState(true);
  // Navigator
  const navigate = useNavigate();

  // State to store the input data from user to send to backend
  const [loginSignUpData, setLoginSignUpData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // Function to update the stored user data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginSignUpData((prevLoginSignUpData) => ({
      ...prevLoginSignUpData,
      [name]: value,
    }));
  };

  // API call for LOGIN & REGISTER
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, username, email, password } = loginSignUpData;
    if (haveAccount) {
      try {
        const response = await axios.post(
          `${USER_API_ENDPOINT}/login`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast(response.data.message);
        if (response.data.success) navigate("/");
      } catch (error) {
        toast(error?.response?.data?.message || "Internal Server Error");
      }
    } else {
      try {
        const response = await axios.post(
          `${USER_API_ENDPOINT}/register`,
          {
            name,
            username,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast(response.data.message);
        if (response.data.success) loginSignupHandler();
      } catch (error) {
        toast(error?.response?.data?.message || "Internal Server Error");
      }
    }
  };

  // Toggling between login & signup
  const loginSignupHandler = () => {
    setHaveAccount((prevhaveAccount) => !prevhaveAccount);
  };
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex items-center justify-around gap-10 w-[80%]">
        {/* Twitter Image */}
        <div className="">
          <img
            className="h-72"
            src="https://imgs.search.brave.com/JSCTdx5RmCcveSa-5gF69eVlcSf-4pr9WuYI_fLZqlE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY5MDY0Mzc3/N3R3aXR0ZXIteCUy/MGxvZ28tcG5nLXdo/aXRlLnBuZw"
            alt="x-logo"
          />
        </div>
        <div className=" flex flex-col ">
          {/* Happening now text  */}
          <div className="mb-14">
            <h1 className="text-7xl tracking-tighter font-extrabold">
              Happening now.
            </h1>
          </div>
          {/* Login or Register TEXT */}
          <h1 className=" text-4xl font-bold mb-5">
            {haveAccount ? "Login" : "Register"}
          </h1>
          {/* LOGIN/REGISTER FORM */}
          <form
            className=" flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            {!haveAccount && (
              <>
                {/* NAME INPUT */}
                <input
                  className=" bg-transparent text-lg w-96 outline-none border-2 border-zinc-800 rounded-full py-2 px-5 focus-within:border-sky-500 placeholder:pl-1"
                  type="text"
                  name="name"
                  value={loginSignUpData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
                {/* USERNAME INPUT */}
                <input
                  className=" bg-transparent text-lg w-96 outline-none border-2 border-zinc-800 rounded-full py-2 px-5 focus-within:border-sky-500 placeholder:pl-1"
                  type="text"
                  name="username"
                  value={loginSignUpData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </>
            )}
            {/* EMAIL INPUT */}
            <input
              className=" bg-transparent text-lg w-96 outline-none border-2 border-zinc-800 rounded-full py-2 px-5 focus-within:border-sky-500 placeholder:pl-1"
              type="email"
              name="email"
              value={loginSignUpData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {/* PASSWORD INPUT */}
            <input
              className=" bg-transparent text-lg w-96 outline-none border-2 border-zinc-800 rounded-full py-2 px-5 focus-within:border-sky-500 placeholder:pl-1"
              type="password"
              name="password"
              value={loginSignUpData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {/* SUBMIT button */}
            <button className="self-start w-96 px-6 py-2 text-lg font-bold rounded-full bg-sky-700">
              {haveAccount ? "Login" : "Create Account"}
            </button>
          </form>
          <h3 className="text-lg mt-2 tracking-wider">
            {haveAccount
              ? "Do not have an account? "
              : "Already have an account? "}
            {/* LOGIN / SIGNUP FORM toggle button */}
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
