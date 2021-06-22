import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Notification } from "../../components/notifications/DangerNotification";

const initialState = {
  rooms: [],
  status: "idle",
  error: null,
};

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await axios.get(`/api/rooms`);
  // console.log("response from patient fetch", response);
  return response.data;
});

export const checkRoomAvailability = (obj) => async (dispatch) => {
  console.log("obj", obj);
  try {
    const response = await axios.get(
      `/api/rooms/${obj.block}/${obj.type}/${obj.occupants}`
    );
    // console.log("response", response);
    // if (response.data.length === 0) {
    //   Notification({ type: "error", message: "Credentials Incorrect" });
    // } else {
    //   await dispatch(AUTHENTICATE_USER_SUCCESS(response.data[0]));
    //   return response.data[0];
    // }
    return response.data;
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

export const addRoom = (data) => async (dispatch) => {
  //formdata.delete('tempfile');
  try {
    // const response = await axios.post('/api/rooms/',{category_name:data})

    const response = await axios({
      method: "POST",
      url: `/api/user/`,
      data: data,
    });
    console.log("response", response);

    if (response.data.errors) {
      Notification({
        type: "error",
        message: "some required fields are empty",
      });
      await dispatch(SAVE_ROOMS_FAILURE());
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

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    SAVE_ROOMS_SUCCESS: (state, action) => {
      console.log("Category saved Payload", action.payload);
      const { _id } = action.payload;

      state.status = "success";

      let index = state.rooms.find((x) => x._id === _id);
      console.log("index value", index);
      if (index) {
      } else {
        state.rooms = state.rooms.concat(action.payload);
      }
    },
    SAVE_ROOMS_FAILURE: (state, action) => {
      state.error = action.payload;
    },
    SAVE_ROOMS_DEFAULT: (state, action) => {
      state.status = "idle";
    },

    UPDATE_ROOMS_SUCCESS: (state, action) => {
      const { dataUpdated } = action.payload;

      state.status = "success";
      console.log("payload form update_produce_sucess", action);
      //state.error = payload

      const existingPost = state.rooms.find(
        (post) => post.category_id === dataUpdated._id
      );
      if (existingPost) {
        existingPost.room_name = dataUpdated.category_name;
        existingPost.room_participants = dataUpdated.room_participants;
      }
    },
    UPDATE_ROOMS_FAILURE: (state, action) => {
      const { payload } = action;
      state.status = "failed";
      console.log("payload error", payload);
      state.error = payload;
    },
    UPDATE_ROOMS_DEFAULT: (state, action) => {
      state.status = "idle";
    },

    DELETE_ROOMS_SUCCESS: (state, action) => {
      const { _id } = action.payload;
      console.log("delete product", action.payload);
      state.status = "success";
      console.log("payload form update_produce_sucess", action);
      //state.error = payload

      let index = state.rooms.findIndex((post) => post._id === _id);
      console.log("index to delete", index);
      if (index >= 0) {
        state.rooms.splice(index, 1);
      }
    },
    DELETE_ROOMS_FAILURE: (state, action) => {
      const { payload } = action;
      state.status = "failed";
      console.log("payload error", payload);
      state.error = payload;
    },
  },
  extraReducers: {
    [fetchRooms.pending]: (state, action) => {
      state.status = "loading";
      state.loading = true;
    },
    [fetchRooms.fulfilled]: (state, action) => {
      // const { category_id } = action.payload

      const data = action.payload;

      state.status = "success";
      state.loading = false;

      let checkArry = state.rooms.concat(data);

      const uniqueArray = checkArry.filter(
        (object, index) =>
          index ===
          checkArry.findIndex(
            (obj) => JSON.stringify(obj) === JSON.stringify(object)
          )
      );

      state.rooms = uniqueArray;

      // let index = state.rooms.findIndex(rooms => rooms.category_id === category_id)
      // if (index >= 0) {

      // } else {
      //   state.rooms = state.rooms.concat(action.payload)

      // }
    },
    [fetchRooms.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = true;
    },
  },
});

export const {
  SAVE_ROOMS_SUCCESS,
  SAVE_ROOMS_FAILURE,
  SAVE_ROOMS_DEFAULT,
  UPDATE_ROOMS_SUCCESS,
  UPDATE_ROOMS_FAILURE,
  UPDATE_ROOMS_DEFAULT,
  DELETE_ROOMS_SUCCESS,
  DELETE_ROOMS_FAILURE,
} = roomSlice.actions;

export const selectAllRooms = (state) => state.rooms.rooms;

export default roomSlice.reducer;
