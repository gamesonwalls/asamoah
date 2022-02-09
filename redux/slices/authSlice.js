import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
// import { fetchUsers } from "./userSlice";
// import setAuthTokenAdmin from "../../utils/setAuthTokenAdmin";
import { Notification } from "../../components/notifications/DangerNotification";

import { setCookie, destroyCookie } from "nookies";
import { axiosAuth } from "../../utils/axios";

const initialState = {
  isAuthenticated: null,
  status: "idle",
  loading: false,
  user: {},
  error: "",
};

export const fetchAuthenticatedUser = () => async (dispatch) => {
  try {
    const response = await axiosAuth.get(`api/auth/admin`);
    console.log("response from fetch Authenticate User", response);
    if (response.status === 200) {
      // return response.data

      dispatch(GET_ADMIN_DATA_SUCCESS(response.data));

      return response;
    } else {
      dispatch(GET_ADMIN_DATA_FAILURE());
      return data;
      // return response.data
    }
  } catch (error) {
    console.log("error in fetch admin", error);
    dispatch(LOGOUT());
  }
};

export const authenticateUser =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `/api/auth/`,
        { email: email, password: password },
        config
      );

      console.log("response auth", response.data);
      if (response.data.error) {
        destroyCookie(null, "token");
        setCookie(null, "token", "", {});
      } else {
        destroyCookie(null, "token");
        setCookie(null, "token", response.data.token, {});

        // await setAuthTokenAdmin(response.data.token);
        await dispatch(fetchAuthenticatedUser());
      }

      // await dispatch(LOGIN_SUCCESS(response.data));
      // await dispatch(fetchAuthenticatedAdmin());

      // return response.data
    } catch (err) {
      console.log("err", err);
      const errors = err.response.data;
      console.log("errors from ", errors);

      dispatch(LOGIN_FAILURE({ error: errors }));

      if (errors.errors) {
        Notification({ type: "error", message: errors.errors });
      } else {
        Notification({
          type: "error",
          message: "Something went wrong with ip or port.(Server Error) ",
        });
      }
    }
  };

export const UpdateAdminCredential =
  ({ old_password, new_password, email }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(
        `/api/auth/admin/updatePassword`,
        {
          old_password: old_password,
          new_password: new_password,
          email: email,
        },
        config
      );
      //  await dispatch(LOGIN_SUCCESS(response.data));
      //  await dispatch(fetchAuthenticatedAdmin())

      Notification({ type: "success", message: "Password Changed" });

      // return response.data
    } catch (err) {
      console.log("err", err);
      const errors = err.response.data;
      console.log("errors from ", errors);

      //dispatch(LOGIN_FAILURE({error:errors}));

      if (errors.errors) {
        Notification({ type: "error", message: errors.errors });
      } else {
        Notification({
          type: "error",
          message: "Something went wrong with ip or port ",
        });
      }
    }
  };

export const updateAdminInfo = (formdata) => async (dispatch) => {
  //formdata.delete('tempfile');

  try {
    const response = await axios({
      method: "POST",
      url: `/api/auth/admin/updateAdminInfo`,
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    console.log("response from update admin info", response);
    if (response.data.errors) {
      // Notification({type:'error',message:'some required fields are empty'})
      // await dispatch(UPDATE_PRODUCT_DEFAULT())
      //   return response.data

      let newArry = [];
      response.data.errors.map((r, index) => {
        newArry.push(r.msg);
        return newArry;
      });

      Notification({ type: "error", message: newArry.join("\n") });
    } else {
      Notification({ type: "success", message: "Info Updated" });
      await dispatch(UPDATE_ADMIN_INFO(response.data));
      //return response.data
    }
  } catch (err) {
    // const errors=err.response.data
    console.log("err", err);

    Notification({
      type: "error",
      message: "Failed to Update, cannot find server",
    });
  }
};

export const updateUserInfo = (formdata) => async (dispatch) => {
  //formdata.delete('tempfile');

  try {
    const response = await axios({
      method: "POST",
      url: `/api/auth/admin/updateUserInfo`,
      data: formdata,
    });

    console.log("response from update admin info", response);
    if (response.data.errors) {
      // Notification({type:'error',message:'some required fields are empty'})
      // await dispatch(UPDATE_PRODUCT_DEFAULT())
      //   return response.data

      let newArry = [];
      response.data.errors.map((r, index) => {
        newArry.push(r.msg);
        return newArry;
      });

      Notification({ type: "error", message: newArry.join("\n") });
    } else {
      Notification({ type: "success", message: "Info Updated" });
      await dispatch(UPDATE_ADMIN_INFO(response.data));
      //return response.data
    }
  } catch (err) {
    // const errors=err.response.data
    console.log("err", err);

    Notification({
      type: "error",
      message: "Failed to Update, cannot find server",
    });
  }
};

// export const RegisterAdmin =
//   ({ f_name, l_name, username, email, password, role }) =>
//   async (dispatch) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     try {
//       const response = await axios.post(
//         `/api/registration/admin`,
//         {
//           f_name: f_name,
//           l_name: l_name,
//           username,
//           email,
//           password,
//           role: role,
//         },
//         config
//       );
//       console.log("response", response);
//       await dispatch(REGISTER_SUCCESS());
//       Notification({ type: "success", message: "Registration successful" });
//       await dispatch(fetchUsers());
//       // return response.data
//     } catch (err) {
//       //console.log("err",err)
//       const errors = err.response.data;
//       // console.log("errors from ",errors)

//       //dispatch(LOGIN_FAILURE({error:errors}));

//       if (errors.errors) {
//         if (Array.isArray(errors.errors) === true) {
//           let newArry = [];
//           errors.errors.map((r, index) => {
//             newArry.push(r.msg);
//             return newArry;
//           });
//           Notification({ type: "error", message: newArry.join("\n") });
//         } else {
//           console.log("errors.errors", errors.errors);
//           Notification({ type: "error", message: errors.errors.errors });
//         }
//       } else {
//         Notification({
//           type: "error",
//           message: "Something went wrong with ip or port ",
//         });
//       }
//     }
//   };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN_SUCCESS: (state, action) => {
      const { payload } = action;
      console.log("payload login", payload);
      state.status = "succeeded";
      state.loading = false;
      state.isAuthenticated = true;
      state.token = payload.token;
      state.error = null;
      //state.user=
      localStorage.setItem("token", payload.token);
    },
    LOGIN_FAILURE: (state, action) => {
      const { payload } = action;
      state.status = "failed";
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = payload.error.errors;
      state.user = {};

      localStorage.removeItem("token");
    },
    LOGIN_IDLE: (state, action) => {
      const { payload } = action;
      state.status = "idle";
      state.token = null;
      state.isAuthenticated = false;
      state.loading = true;
      state.error = payload.error;
      localStorage.removeItem("token");
    },
    LOGOUT: (state, action) => {
      state.status = "idle";
      state.token = null;
      state.isAuthenticated = false;
      state.loading = true;
      state.error = null;
    },
    GET_ADMIN_DATA_SUCCESS: (state, action) => {
      // Add user to the state array
      let { payload } = action;
      // if(payload)

      state.user = { ...state.user, ...payload };
      //}
    },
    GET_ADMIN_DATA_FAILURE: (state, action) => {
      // Add user to the state array

      state.user.length = 0;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },

    REGISTER_SUCCESS: (state, action) => {
      state.isReg = true;
    },

    UPDATE_ADMIN_INFO: (state, action) => {
      const { dataUpdated } = action.payload;

      state.status = "success";
      console.log("payload form update_produce_sucess", action);
      //state.error = payload

      const existingPost = state.user.find(
        (post) => post.admin_id === dataUpdated.admin_id
      );
      if (existingPost) {
        existingPost.f_name = dataUpdated.product_name;
        existingPost.l_name = dataUpdated.l_name;
        existingPost.username = dataUpdated.username;
        existingPost.role = dataUpdated.role;

        existingPost.image = dataUpdated.image;
      }
    },
  },
  extraReducers: {
    [fetch.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetch.fulfilled]: (state, action) => {},
    [fetch.rejected]: (state, action) => {},
  },
});

export const {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_IDLE,
  LOGOUT,
  GET_ADMIN_DATA_FAILURE,
  GET_ADMIN_DATA_SUCCESS,
  REGISTER_SUCCESS,
  UPDATE_ADMIN_INFO,
} = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

export const selectAuth = (state) => state.auth;
