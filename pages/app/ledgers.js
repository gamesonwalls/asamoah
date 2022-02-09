import React, { useEffect, useState } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

import { Table } from "antd";

import { Tabs } from "antd";

const { TabPane } = Tabs;

import data from "../../utils/tableColumns";
import {
  addLedger,
  fetchLedgerCodes,
  fetchLedgers,
  selectAllLedgers,
  selectAllLedgersCodes,
} from "../../redux/slices/ledgerSlice";
import { useDispatch, useSelector } from "react-redux";

import $ from "jquery";
import uuid from "react-uuid";
import {
  fetchBalanceSheet,
  fetchBalanceSheetComposition,
  fetchLedgerComposition,
  fetchProfitLoss,
  selectAllBalanceSheetComposition,
  selectAllLedgerComposition,
  selectAllPL_BS_Data,
} from "../../redux/slices/globalSlice";

import Spinner from "../../components/Spinner";
const { ColumnEditLedger } = data;

function ledgers() {
  const dispatch = useDispatch();
  const ledgerCodeStatus = useSelector((state) => state.ledger.status_lc);
  const ledgersCodesAll = useSelector(selectAllLedgersCodes);
  const ledgerComposition = useSelector(selectAllLedgerComposition);
  const balanceSheetComposition = useSelector(selectAllBalanceSheetComposition);

  const pl_bsItems = useSelector(selectAllPL_BS_Data);
  console.log("pl_bsItems", pl_bsItems);

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (ledgerCodeStatus === "idle") {
      dispatch(fetchLedgerCodes());
    } else if (ledgerCodeStatus === "success" && ledgersCodesAll.length === 0) {
      dispatch(fetchLedgerCodes())
        .then((response) => {})
        .catch((error) => {
          console.log("Server not found", error);
        });
    } else {
    }
  }, []);

  // console.log("ledgersAll", ledgersAll);

  const createLedger = (e) => {
    e.preventDefault();
    setisLoading(true);

    var code = $("#codes").val();
    var description = $("#description").val();
    var pl_bs = $("#pl_bs").val();
    var is_bs_radio = $('input[name="IS_BS_Radio"]:checked').val();
    let type = $("#type").children("option:selected").text();

    let obj = {
      codes: code,
      description: description,
      pl_bs: pl_bs,
      is_bs_radio: is_bs_radio,
      type: type,
    };

    dispatch(addLedger(obj))
      .then((res) => {
        console.log("res", res);
        setisLoading(false);
      })
      .catch((err) => {
        setisLoading(false);
      });
  };

  const IncomeStatementRadio = () => {
    if ($("#inlineRadio1").is(":checked")) {
      // this.setState({ radio: "Income Statement" });
      dispatch(fetchProfitLoss());
      $("#pl_bs").prop("disabled", false);
      $("#type").prop("disabled", true);
    }
  };

  const BalanceSheetRadio = () => {
    if ($("#inlineRadio2").is(":checked")) {
      dispatch(fetchBalanceSheet());
      $("#pl_bs").prop("disabled", false);
      $("#type").prop("selectedIndex", 0);
      $("#type").prop("disabled", true);
    }
  };

  const getInfoByPLBS = (e) => {
    if (e.target.value == "Income" || e.target.value == "Expenditure") {
      dispatch(fetchLedgerComposition(e.target.value))
        .then((response) => {
          $("#type").prop("disabled", false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if (
      e.target.value == "Current Assets" ||
      e.target.value == "Current Liabilities" ||
      e.target.value == "Non-Current Assets" ||
      e.target.value == "Financed by"
    ) {
      //alert(e.target.value)
      $("#type").prop("disabled", true);
      dispatch(fetchBalanceSheetComposition(e.target.value))
        .then((response) => {
          console.log("getBalanceSheet_comp", response);

          $("#type").prop("disabled", false);
        })
        .catch(function (error) {
          console.log(error);
          message.error(`${error}'File failed to upload'`);
        });
    }
  };

  // const descriptionKeyup = () => {
  //   var description = $("#description").val();

  //   if (description !== "") {
  //     axios
  //       .post("/api/accounts/checkLedgersDescrip", { description: description })
  //       .then((response) => {
  //         console.log(response);

  //         if (response.data.Data === "Match") {
  //           $("#checker").css("color", "red");
  //           $("#checker").text("Data already exist");

  //           return true;
  //         } else {
  //           $("#checker").text("");
  //           return false;
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   } else {
  //     $("#checker").text("");
  //   }
  // };

  let ledToDisplay = ledgersCodesAll.map((r) => {
    return Object.assign({}, r, {
      key: uuid(),
      action: (
        <div className="flex" key={uuid()}>
          {" "}
          <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2">
            <PencilAltIcon className="h-5 w-5 " />
          </button>
          <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
            <TrashIcon className="h-5 w-5 " />
          </button>
        </div>
      ),
    });
  });
  return (
    <div className="container mt-4">
      <div class="shadow overflow-hidden sm:rounded-md p-3 bg-white">
        <Tabs defaultActiveKey="1" type="card" style={{ marginTop: 5 }}>
          <TabPane tab="Create Ledger" key="1">
            <form onSubmit={createLedger} method="post">
              <div className="container">
                <h4>Create Ledger(s)</h4>
                <hr />
                <div className="row">
                  <div className="col-md-4">
                    <div className="radio-inline">
                      <label>
                        <input
                          type="radio"
                          name="IS_BS_Radio"
                          id="inlineRadio1"
                          value="Income Statement"
                          onClick={IncomeStatementRadio}
                          required
                        />
                        Income Statement
                      </label>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="radio-inline">
                      <label>
                        <input
                          type="radio"
                          name="IS_BS_Radio"
                          id="inlineRadio2"
                          value="Balance Sheet"
                          onClick={BalanceSheetRadio}
                          required
                        />
                        Balance Sheet
                      </label>
                    </div>
                  </div>

                  <div className="col-md-4"></div>

                  <div className="col-md-6">
                    <label>P/L or B/S Group</label>
                    <div className="">
                      <select
                        className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                        id="pl_bs"
                        disabled
                        required
                        onChange={getInfoByPLBS}
                      >
                        <option>Choose</option>
                        {pl_bsItems.map((r) => (
                          <option key={r._id} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label>P/L or B/S Subgroup</label>
                    <select
                      className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                      id="type"
                      disabled
                      required
                    >
                      <option>Choose</option>
                      {ledgerComposition.map((r) => (
                        <option key={r._id} value={r.name}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label>Code</label>
                    <div className="form-group">
                      <input
                        type="text"
                        id="codes"
                        className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                        placeholder="Must be pattern on 4 digits"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-10">
                    <label>Description</label>
                    <div className="form-group">
                      <input
                        type="text"
                        id="description"
                        className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                        placeholder=""
                        required
                      />
                    </div>
                    <div id="checker"></div>
                  </div>

                  <div className="col-md-12">
                    <img
                      alt=""
                      src="img/loader.gif"
                      width="40"
                      id="load"
                      className="img-responsive center-block"
                      style={{ display: "none" }}
                    />

                    <div id="results" className="col-md-12"></div>
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300 "
                      style={{ marginTop: "3%" }}
                      name=""
                      type="submit"
                      href="#"
                      role="button"
                    >
                      {isLoading === true ? <Spinner /> : <></>}
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </TabPane>
          <TabPane tab="All Ledgers" key="2">
            <div className="col-md-12">
              <Table dataSource={ledToDisplay} columns={ColumnEditLedger} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default ledgers;
