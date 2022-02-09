import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthenticatedUser,
  LOGOUT,
  selectUser,
  verifyUser,
} from "../redux/slices/authSlice";

import { useRouter } from "next/router";
import { setCookie, destroyCookie } from "nookies";

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  const router = useRouter();

  let userLoggedIn = useSelector(selectUser);

  useEffect(() => {
    // console.log("userLoggedIn", userLoggedIn);
    // if (Object.keys(userLoggedIn).length === 0) {
    //   destroyCookie(null, "token");
    //   setCookie(null, "token", "", {});

    //   dispatch(LOGOUT());

    //   router.push("/login");
    // }
    // return dispatch(fetchAuthenticatedUser()).then(async (user) => {
    //   if (!user) {
    //

    // destroyCookie(null, "token");
    // setCookie(null, "token", "", {});
    //   } else {
    //     const { token } = await user.getIdToken();

    //     destroyCookie(null, "token");
    //     setCookie(null, "token", token, {});

    //     await dispatch(verifyUser);
    //   }
    // });

    // dispatch(fetchAuthenticatedUser())
    //   .then((res) => {
    //     if (res === undefined) {
    //       dispatch(LOGOUT());
    //       router.push("/login");
    //     }
    //     console.log("res@fetchAuthenticatedUser Provider", res);
    //   })
    //   .catch((err) => {});
    return () => {
      // effect;
    };
  }, [userLoggedIn]);

  return <>{children}</>;
}

export default AuthProvider;
