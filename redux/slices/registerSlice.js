import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Notification } from "../../components/notifications/DangerNotification";

const initialState = {
  userInfo: {},
  status: "idle",
};

export const registerUser = (data) => async (dispatch) => {
  //formdata.delete('tempfile');
  try {
    // const response = await axios.post('/api/patients/',{category_name:data})

    const response = await axios({
      method: "POST",
      url: `/api/register/`,
      data: data,
    });
    console.log("response", response);

    if (response.data.errors) {
      Notification({
        type: "error",
        message: "some required fields are empty",
      });
      // await dispatch(SAVE_PATIENT_FAILURE());
      return response.data;
    } else if (response.data.msg === "You have already registered") {
      Notification({ type: "error", message: response.data.msg });
    } else {
      Notification({ type: "success", message: response.data.msg });

      return response.data;
    }
  } catch (error) {
    console.log("error saving pr", error);
    Notification({
      type: "error",
      message: "Oops failed to connect to server",
    });
    return error;
  }
};

export const AuthenticateUser = (obj) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(`/api/authuser/`, { data: obj }, config);
    console.log("response", response);
    if (response.data.length === 0) {
      Notification({ type: "error", message: "Credentials Incorrect" });
    } else {
      await dispatch(AUTHENTICATE_USER_SUCCESS(response.data[0]));
      return response.data[0];
    }

    // return response.data
  } catch (err) {
    console.log("err", err);
  }
};

export const VerifyUser = (obj) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `/api/verifyuser/`,
      { data: obj },
      config
    );
    console.log("response", response);
    if (response.data.length === 0) {
      Notification({ type: "error", message: "Credentials Incorrect" });
      return response;
    } else {
      //await dispatch(AUTHENTICATE_USER_SUCCESS(response.data[0]));
      return response;
    }

    // return response.data
  } catch (err) {
    console.log("err", err);
  }
};

export const appSlice = createSlice({
  name: "register",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },

    AUTHENTICATE_USER_SUCCESS: (state, action) => {
      console.log("action.payload", action.payload);
      state.userInfo = action.payload;
    },
  },
});

export const { AUTHENTICATE_USER_SUCCESS } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;

export default appSlice.reducer;
