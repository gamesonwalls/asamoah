import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Notification } from "../../components/notifications/DangerNotification";

const initialState = {
  bookings: [],
  status: "idle",
  error: null,
};

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const response = await axios.get(`/api/book`);
    // console.log("response from patient fetch", response);
    return response.data;
  }
);

export const addBooking = (data) => async (dispatch) => {
  //formdata.delete('tempfile');
  try {
    // const response = await axios.post('/api/bookings/',{category_name:data})

    const response = await axios({
      method: "POST",
      url: `/api/book/`,
      data: data,
    });
    console.log("response", response);

    if (response.data.errors) {
      Notification({
        type: "error",
        message: "some required fields are empty",
      });
      await dispatch(SAVE_BOOKING_FAILURE());
      return response.data;
    } else if (response.data.msg === "You have already booked") {
      Notification({ type: "error", message: response.data.msg });
      return response.data;
    } else if (response.data.msg === "Sorry room is full") {
      Notification({ type: "error", message: response.data.msg });
      return response.data;
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

export const uploadPaymentSlip = (formdata) => async (dispatch) => {
  //formdata.delete('tempfile');
  try {
    // const response = await axios.post('/api/patients/',{category_name:data})
    console.log("formdata", formdata);

    const response = await axios({
      method: "PUT",
      url: `/api/uploadslip`,
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    console.log("response", response);

    if (response.data.errors) {
      Notification({
        type: "error",
        message: "some required fields are empty",
      });
      // await dispatch(SAVE_PATIENT_FAILURE());
      return response.data;
    } else if (response.data.msg === "Image is required") {
      Notification({ type: "error", message: response.data.msg });
      // await dispatch(SAVE_PATIENT_DEFAULT());
    } else {
      Notification({ type: "success", message: response.data.msg });

      return response.data;
    }
  } catch (error) {
    console.log("error saving pr", error);
    await dispatch(SAVE_PATIENT_FAILURE());
    return error;
  }
};

export const bookSlice = createSlice({
  name: "bookings",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    SAVE_BOOKING_SUCCESS: (state, action) => {
      console.log("Category saved Payload", action.payload);
      const { _id } = action.payload;

      state.status = "success";

      let index = state.bookings.find((x) => x._id === _id);
      console.log("index value", index);
      if (index) {
      } else {
        state.bookings = state.bookings.concat(action.payload);
      }
    },
    SAVE_BOOKING_FAILURE: (state, action) => {
      state.error = action.payload;
    },
    SAVE_BOOKING_DEFAULT: (state, action) => {
      state.status = "idle";
    },

    UPDATE_BOOKING_SUCCESS: (state, action) => {
      const { dataUpdated } = action.payload;

      state.status = "success";
      console.log("payload form update_produce_sucess", action);
      //state.error = payload

      const existingPost = state.bookings.find(
        (post) => post.category_id === dataUpdated._id
      );
      if (existingPost) {
        existingPost.room_name = dataUpdated.category_name;
        existingPost.room_participants = dataUpdated.room_participants;
      }
    },
    UPDATE_BOOKING_FAILURE: (state, action) => {
      const { payload } = action;
      state.status = "failed";
      console.log("payload error", payload);
      state.error = payload;
    },
    UPDATE_BOOKING_DEFAULT: (state, action) => {
      state.status = "idle";
    },

    DELETE_BOOKING_SUCCESS: (state, action) => {
      const { _id } = action.payload;
      console.log("delete product", action.payload);
      state.status = "success";
      console.log("payload form update_produce_sucess", action);
      //state.error = payload

      let index = state.bookings.findIndex((post) => post._id === _id);
      console.log("index to delete", index);
      if (index >= 0) {
        state.bookings.splice(index, 1);
      }
    },
    DELETE_BOOKING_FAILURE: (state, action) => {
      const { payload } = action;
      state.status = "failed";
      console.log("payload error", payload);
      state.error = payload;
    },
  },
  extraReducers: {
    [fetchBookings.pending]: (state, action) => {
      state.status = "loading";
      state.loading = true;
    },
    [fetchBookings.fulfilled]: (state, action) => {
      // const { category_id } = action.payload

      const data = action.payload;

      state.status = "success";
      state.loading = false;

      let checkArry = state.bookings.concat(data);

      const uniqueArray = checkArry.filter(
        (object, index) =>
          index ===
          checkArry.findIndex(
            (obj) => JSON.stringify(obj) === JSON.stringify(object)
          )
      );

      state.bookings = uniqueArray;

      // let index = state.bookings.findIndex(bookings => bookings.category_id === category_id)
      // if (index >= 0) {

      // } else {
      //   state.bookings = state.bookings.concat(action.payload)

      // }
    },
    [fetchBookings.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = true;
    },
  },
});

export const {
  SAVE_BOOKING_SUCCESS,
  SAVE_BOOKING_FAILURE,
  SAVE_BOOKING_DEFAULT,
  UPDATE_BOOKING_SUCCESS,
  UPDATE_BOOKING_FAILURE,
  UPDATE_BOOKING_DEFAULT,
  DELETE_BOOKING_SUCCESS,
  DELETE_BOOKING_FAILURE,
} = bookSlice.actions;

export const selectAllBookings = (state) => state.bookings.bookings;

export default bookSlice.reducer;
