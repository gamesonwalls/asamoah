import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Notification } from "../../components/notifications/DangerNotification";
import { axiosAuth } from "../../utils/axios";

const initialState = {
  qrs: [],

  status: "idle",

  error: null,
};

export const fetchBalanceSheet = createAsyncThunk(
  "ledgers/fetchBalanceSheet",
  async () => {
    const response = await axiosAuth.get(`/api/balancesheet`);
    // console.log("response from patient fetch", response);
    return response.data;
  }
);

export const fetchProfitLoss = createAsyncThunk(
  "ledgers/fetchProfitLoss",
  async () => {
    const response = await axiosAuth.get("/api/profitloss");
    // console.log("response from patient fetch", response);
    return response.data;
  }
);

export const saveRestaurantQRData = (formdata) => async (dispatch) => {
  console.log(formdata.getAll("menu_name"));
  try {
    // const response = await axiosAuth.post("/api/qr", {
    //   data: formdata,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     "X-Requested-With": "XMLHttpRequest",
    //   },
    // });

    const response = await axiosAuth({
      method: "POST",
      url: "/api/qr/",
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    console.log("response @ saveOpenBalances", response);

    if (response.data.errors) {
      Notification({
        type: "error",
        message: "some required fields are empty",
      });
      await dispatch(SAVE_LEDGERS_FAILURE());
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

export const globalSlice = createSlice({
  name: "global",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    SAVE_LEDGERS_SUCCESS: (state, action) => {
      console.log("Category saved Payload", action.payload);
      const { _id } = action.payload;

      state.status = "success";

      let index = state.ledgers.find((x) => x._id === _id);
      console.log("index value", index);
      if (index) {
      } else {
        state.ledgers = state.ledgers.concat(action.payload);
      }
    },
    SAVE_LEDGERS_FAILURE: (state, action) => {
      state.error = action.payload;
    },
    SAVE_LEDGERS_DEFAULT: (state, action) => {
      state.status = "idle";
    },

    UPDATE_LEDGERS_SUCCESS: (state, action) => {
      const { dataUpdated } = action.payload;

      state.status = "success";
      console.log("payload form update_produce_sucess", action);
      //state.error = payload

      const existingPost = state.ledgers.find(
        (post) => post.category_id === dataUpdated._id
      );
      if (existingPost) {
        existingPost.room_name = dataUpdated.category_name;
        existingPost.room_participants = dataUpdated.room_participants;
      }
    },
    UPDATE_LEDGERS_FAILURE: (state, action) => {
      const { payload } = action;
      state.status = "failed";
      console.log("payload error", payload);
      state.error = payload;
    },
    UPDATE_LEDGERS_DEFAULT: (state, action) => {
      state.status = "idle";
    },

    // DELETE_LEDGERS_SUCCESS: (state, action) => {
    //   const { _id } = action.payload;
    //   console.log("delete product", action.payload);
    //   state.status = "success";
    //   console.log("payload form update_produce_sucess", action);
    //   //state.error = payload

    //   let index = state.ledgers.findIndex((post) => post._id === _id);
    //   console.log("index to delete", index);
    //   if (index >= 0) {
    //     state.ledgers.splice(index, 1);
    //   }
    // },
    // DELETE_LEDGERS_FAILURE: (state, action) => {
    //   const { payload } = action;
    //   state.status = "failed";
    //   console.log("payload error", payload);
    //   state.error = payload;
    // },
  },
  extraReducers: {
    // [fetchBalanceSheetComposition.pending]: (state, action) => {
    //   state.status_bsc = "loading";
    //   state.loading = true;
    // },
    // [fetchBalanceSheetComposition.fulfilled]: (state, action) => {
    //   // const { category_id } = action.payload
    //   const data = action.payload;
    //   state.status_lc = "success";
    //   state.loading = false;
    //   state.ledger_composition = data;
    // },
    // [fetchBalanceSheetComposition.rejected]: (state, action) => {
    //   state.status_bsc = "failed";
    //   state.error = action.error.message;
    //   state.loading = true;
    // },
  },
});

export const {
  SAVE_LEDGERS_SUCCESS,
  SAVE_LEDGERS_FAILURE,
  SAVE_LEDGERS_DEFAULT,
  UPDATE_LEDGERS_SUCCESS,
  UPDATE_LEDGERS_FAILURE,
  UPDATE_LEDGERS_DEFAULT,
  DELETE_LEDGERS_SUCCESS,
  DELETE_LEDGERS_FAILURE,
} = globalSlice.actions;

export const selectAllBalanceSheet = (state) => state.global.balance_sheet;
export const selectAllProfitLoss = (state) => state.global.profit_loss;
export const selectAllLedgerComposition = (state) =>
  state.global.ledger_composition;

export const selectAllPL_BS_Data = (state) => state.global.pl_bs_items;

export const selectAllBalanceSheetComposition = (state) =>
  state.global.balance_sheet_composition;

export default globalSlice.reducer;
