import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";
import { authenticateUser, selectUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

// import("flowbite");

export default function Home() {
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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-50">
        <div className="mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
          <a
            href="https://demo.themesberg.com/windster/"
            className="text-2xl font-semibold flex justify-center items-center mb-8 lg:mb-10"
          >
            <img
              src="https://demo.themesberg.com/windster/images/logo.svg"
              className="h-10 mr-4"
              alt="Windster Logo"
            />
            <span className="self-center text-2xl font-bold whitespace-nowrap">
              Windster
            </span>
          </a>

          <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
            <form onSubmit={submitLogin}>
              <div className="p-6 sm:p-8 lg:p-16 space-y-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Sign in to platform
                </h2>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                    onChange={(e, name) => handleValueChange(e, name)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    required
                    onChange={handleValueChange}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      name="remember"
                      type="checkbox"
                      className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                      required=""
                    />
                  </div>
                  <div className="text-sm ml-3">
                    <label
                      htmlFor="remember"
                      className="font-medium text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-teal-500 hover:underline ml-auto"
                  >
                    Lost Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500">
                  Not registered?{" "}
                  <a
                    href="https://demo.themesberg.com/windster/authentication/sign-up/"
                    className="text-teal-500 hover:underline"
                  >
                    Create account
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
