import axios from "axios";

import { parseCookies, setCookie, destroyCookie } from "nookies";

export const axiosPublic = axios.create({
  baseURL: process.env.NEXT_API_URL,
});

export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

// export const axiosAuth = axios.create();

axiosAuth.interceptors.request.use(async (config) => {
  const cookies = parseCookies();
  console.log("cookies", cookies);

  config.headers.token = cookies.token;
  return config;
});
