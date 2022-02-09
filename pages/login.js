import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// import { GithubIcon, TwitterIcon } from '../icons';
import { Label, Input, Button } from "@windmill/react-ui";
import { GithubIcon, TwitterIcon } from "../icons";
import { authenticateUser, selectUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function loginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const selectadmin = useSelector(selectUser);
  const router = useRouter();

  const handleValueChange = ({ target }) => {
    //  console.log("value", e.target.value, "name", e.target.name);
    setCredentials({ ...credentials, [target.name]: target.value });
    console.log("credentials", credentials);
  };

  if (Object.keys(selectadmin).length > 0) {
    // alert('Login Successful')

    router.push("/app");
  }

  async function submitLogin(e) {
    e.preventDefault();

    let body = { email: credentials.email, password: credentials.password };

    dispatch(authenticateUser(body));
  }
  return (
    <div
      className=" bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4"
      style={{ height: "100vh" }}
    >
      <div className="flex flex-col items-center justify-center">
        <img
          src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg1.svg"
          alt="logo"
        />

        <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
          <p
            tabIndex="0"
            className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
          >
            Login to your account
          </p>
          <p
            tabIndex="0"
            className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
          >
            Dont have account?{" "}
            <a className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer">
              {" "}
              Sign up here
            </a>
          </p>
          <button
            aria-label="Continue with google"
            role="button"
            className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-1 px-4 border rounded-lg border-gray-700 flex items-center w-full "
          >
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
              alt="google"
            />
            <p className="text-base font-medium ml-4 text-gray-700 mt-2">
              Continue with Google
            </p>
          </button>

          <div className="w-full flex items-center justify-between ">
            <hr className="w-full bg-gray-400" />
            <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
              OR
            </p>
            <hr className="w-full   " />
          </div>

          <form onSubmit={submitLogin}>
            <div>
              <label
                id="email"
                className="text-sm font-medium leading-none text-gray-800"
              >
                Email
              </label>
              <input
                aria-labelledby="email"
                type="email"
                className=" border rounded  text-sm font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                name="email"
                onChange={(e, name) => handleValueChange(e, name)}
              />
            </div>
            <div className="mt-3  w-full">
              <label
                htmlFor="pass"
                className="text-sm font-medium leading-none text-gray-800"
              >
                Password
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  id="pass"
                  type="password"
                  className=" border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  onChange={handleValueChange}
                  name="password"
                />
                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg5.svg"
                    alt="viewport"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                role="button"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-2 w-full"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
