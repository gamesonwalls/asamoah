import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Notification } from "../../components/notifications/DangerNotification";
import { axiosAuth } from "../../utils/axios";

const initialState = {
  ledger_codes: [],
  ledgers: [],

  journals: [],
  status: "idle",
  status_lc: "idle",
  status_jl: "idle",
  error: null,
};

export const fetchLedgerCodes = createAsyncThunk(
  "ledgers/fetchLedgerCodes",
  async () => {
    const response = await axiosAuth.get("api/ledgers/codes");
    // console.log("response from patient fetch", response);
    return response.data;
  }
);

export const fetchJournals = createAsyncThunk(
  "ledgers/fetchJournals",
  async () => {
    const response = await axiosAuth.get("api/ledgers/journals/");

    return response.data;
  }
);

export const fetchLedgerCodesNonBankCash = createAsyncThunk(
  "ledgers/fetchLedgerCodesNonBankCash",
  async () => {
    const response = await axiosAuth.get("api/ledgers/nonbankcash");
    // console.log("response from patient fetch", response);
    return response.data;
  }
);

export const fetchLedgerCodesBanksOnly = createAsyncThunk(
  "ledgers/fetchLedgerCodesBanksOnly",
  async () => {
    const response = await axiosAuth.get("api/ledgers/bankonly");
    // console.log("response from patient fetch", response);
    return response.data;
  }
);

export const fetchVoucherNumCheck = createAsyncThunk(
  "ledgers/fetchVoucherNumCheck",
  async (voucher) => {
    const response = await axiosAuth.get(`api/ledgers/vouchercheck/${voucher}`);
    // console.log("response from patient fetch", response);
    return response.data;
  }
);

export const fetchOpeningBalance = createAsyncThunk(
  "ledgers/fetchOpeningBalance",
  async () => {
    const response = await axiosAuth.get("api/ledgers/openingbalance");
    // console.log("response from patient fetch", response);
    return response.data;
  }
);

export const addLedger = (data) => async (dispatch) => {
  //formdata.delete('tempfile');
  try {
    // const response = await axios.post('/api/LEDGERS/',{category_name:data})

    const response = await axiosAuth.post("api/ledgers", data);
    console.log("response", response);

    // if(response.status!==200){

    // }
    if (response.data.errors) {
      Notification({
        type: "error",
        message: response.data.errors,
      });
      // await dispatch(SAVE_LEDGERS_FAILURE());
      return response.data;
    } else if (response.data.msg === "You have already registered") {
      // Notification({ type: "error", message: response.data.msg });
    } else {
      // Notification({ type: "success", message: response.data.msg });

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

export const saveJournal = (data) => async (dispatch) => {
  //formdata.delete('tempfile');
  try {
    // const response = await axios.post('/api/LEDGERS/',{category_name:data})

    const response = await axiosAuth.post("api/ledgers/savejournal", data);
    console.log("response", response);

    // if(response.status!==200){

    // }
    if (response.data.errors) {
      Notification({
        type: "error",
        message: response.data.errors,
      });
      // await dispatch(SAVE_LEDGERS_FAILURE());
      return response.data;
    } else if (response.data.msg === "You have already registered") {
      // Notification({ type: "error", message: response.data.msg });
    } else {
      Notification({ type: "success", message: response.data.msg });

      await dispatch(SAVE_JOURNAL_SUCCESS(response.data.savedData[0]));
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

export const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    SAVE_JOURNAL_SUCCESS: (state, action) => {
      const { _id } = action.payload;

      state.status = "success";

      console.log("bookin payload", action.payload);

      let index = state.journals.find((x) => x._id === _id);
      //console.log("index value",index)
      if (index) {
      } else {
        state.journals = state.journals.concat(action.payload);
      }
    },
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

    DELETE_LEDGERS_SUCCESS: (state, action) => {
      const { _id } = action.payload;
      console.log("delete product", action.payload);
      state.status = "success";
      console.log("payload form update_produce_sucess", action);
      //state.error = payload

      let index = state.ledgers.findIndex((post) => post._id === _id);
      console.log("index to delete", index);
      if (index >= 0) {
        state.ledgers.splice(index, 1);
      }
    },
    DELETE_LEDGERS_FAILURE: (state, action) => {
      const { payload } = action;
      state.status = "failed";
      console.log("payload error", payload);
      state.error = payload;
    },
  },
  extraReducers: {
    [fetchJournals.pending]: (state, action) => {
      state.status_jl = "loading";
      state.loading = true;
    },
    [fetchJournals.fulfilled]: (state, action) => {
      // const { category_id } = action.payload

      const data = action.payload;

      state.status_jl = "success";
      state.loading = false;

      state.journals = data;
    },
    [fetchJournals.rejected]: (state, action) => {
      state.status_jl = "failed";
      state.error = action.error.message;
      state.loading = true;
    },
    [fetchLedgerCodes.pending]: (state, action) => {
      state.status_lc = "loading";
      state.loading = true;
    },
    [fetchLedgerCodes.fulfilled]: (state, action) => {
      // const { category_id } = action.payload

      const data = action.payload;

      state.status_lc = "success";
      state.loading = false;

      state.ledger_codes = data;
    },
    [fetchLedgerCodes.rejected]: (state, action) => {
      state.status_lc = "failed";
      state.error = action.error.message;
      state.loading = true;
    },

    [fetchLedgerCodesNonBankCash.pending]: (state, action) => {
      state.status_lc = "loading";
      state.loading = true;
    },
    [fetchLedgerCodesNonBankCash.fulfilled]: (state, action) => {
      // const { category_id } = action.payload

      const data = action.payload;

      state.status_lc = "success";
      state.loading = false;

      state.ledger_codes = data;
    },
    [fetchLedgerCodesNonBankCash.rejected]: (state, action) => {
      state.status_lc = "failed";
      state.error = action.error.message;
      state.loading = true;
    },

    [fetchOpeningBalance.pending]: (state, action) => {
      state.status = "loading";
      state.loading = true;
    },
    [fetchOpeningBalance.fulfilled]: (state, action) => {
      // const { category_id } = action.payload

      const data = action.payload;

      state.status = "success";
      state.loading = false;

      // let checkArry = state.ledgers.concat(data);

      // const uniqueArray = checkArry.filter(
      //   (object, index) =>
      //     index ===
      //     checkArry.findIndex(
      //       (obj) => JSON.stringify(obj) === JSON.stringify(object)
      //     )
      // );

      state.ledgers = data;
    },
    [fetchOpeningBalance.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.loading = true;
    },
  },
});

export const {
  SAVE_JOURNAL_SUCCESS,
  SAVE_LEDGERS_SUCCESS,
  SAVE_LEDGERS_FAILURE,
  SAVE_LEDGERS_DEFAULT,
  UPDATE_LEDGERS_SUCCESS,
  UPDATE_LEDGERS_FAILURE,
  UPDATE_LEDGERS_DEFAULT,
  DELETE_LEDGERS_SUCCESS,
  DELETE_LEDGERS_FAILURE,
} = ledgerSlice.actions;

export const selectAllLedgersCodes = (state) => state.ledger.ledger_codes;

export const selectAllLedgers = (state) => state.ledger.ledgers;
export const selectAllJournals = (state) => state.ledger.journals;

export default ledgerSlice.reducer;
