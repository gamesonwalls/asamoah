import React, { useEffect, useState } from "react";
import { Notification } from "../../components/notifications/DangerNotification";

import Datatable from "../../components/Datatable";

import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

import {
  fetchOpeningBalance,
  selectAllLedgers,
} from "../../redux/slices/ledgerSlice";
import uuid from "react-uuid";

import $ from "jquery";
import { LOGOUT } from "../../redux/slices/authSlice";
import { saveOpenBalances } from "../../redux/slices/globalSlice";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var year = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

var today_now = dd + "-" + mm + "-" + year;
var today_now_ddd = year + "-" + mm + "-" + dd;

let totOpenBalance = [];

function openingbalance() {
  const dispatch = useDispatch();
  const [isError, setisError] = useState("");

  const [isLoading, setisLoading] = useState(false);

  const ledgersAll = useSelector(selectAllLedgers);
  const ledgerStatus = useSelector((state) => state.ledger.status);

  let cloneLedgers = [...ledgersAll].splice(0);

  // function editCell_debit(index) {
  //   let changevalue = $("#cell_name_debit" + index).val();
  //   let debit_credit = $("#cell_name_debit" + index).attr("placeholder");
  //   let name = $("#cell_name_debit" + index).attr("name");

  //   let obj = {
  //     name: name + "_" + debit_credit,
  //     debit_credit: debit_credit,
  //     value: changevalue,
  //   };

  //   totOpenBalance.push(obj);
  // }

  const columnsOpenBalances = [
    {
      key: "code_description",
      title: " Code - Description",
      dataIndex: "code_description",
    },
    {
      key: "date_for_sorting",
      title: "Starting Date",
      dataIndex: "date_for_sorting",
    },
    ,
    {
      key: "debit",
      title: " Debit",
      dataIndex: "debit",
    },
    ,
    {
      key: "credit",
      title: " Credit",
      dataIndex: "credit",
    },
  ];
  function editCell_credit(e, index) {
    let newExistingpost = Object.assign({}, cloneLedgers[index], {
      credit: JSON.stringify([parseFloat(e.target.value)]),
    });

    cloneLedgers[index] = newExistingpost;
  }

  function editCell_debit(e, index) {
    let newExistingpost = Object.assign({}, cloneLedgers[index], {
      debit: JSON.stringify([parseFloat(e.target.value)]),
    });

    cloneLedgers[index] = newExistingpost;
  }

  useEffect(() => {
    if (ledgerStatus === "idle") {
      dispatch(fetchOpeningBalance())
        .then((response) => {
          console.log("response@ fetchOpeningBalance", response);
          // if (
          //   response.error.message === "Request failed with status code 401"
          // ) {
          //   dispatch(LOGOUT());
          // }
        })
        .catch((error) => {
          console.log("Server not found", error);
        });
    } else if (ledgerStatus === "success" && ledgersAll.length === 0) {
      dispatch(fetchOpeningBalance())
        .then((response) => {})
        .catch((error) => {
          console.log("Server not found", error);
        });
    } else {
    }
  }, []);

  let openBToDisplay = ledgersAll.map((r, index) => {
    let cell_name_debit = "cell_name_debit" + index;
    let cell_name_credit = "cell_name_credit" + index;

    let parse_debit = JSON.parse(r.debit);
    let parse_credit = JSON.parse(r.credit);

    let nameT = JSON.parse(r.code_description);

    var mmy = Object.assign({}, r, {
      key: uuid(),
      leg_id: r.leg_id,
      code_description: nameT,
      date_added: r.date_added,
      debit: (
        <div className="col-md-12" key={r}>
          <div className=" ">
            <input
              type="number"
              min="0"
              step={0.01}
              defaultValue={parse_debit}
              className="form-control"
              name={nameT}
              placeholder="debit"
              htmlFor={r.type}
              onChange={(e) => editCell_debit(e, index)}
              id={cell_name_debit}
            />
          </div>
        </div>
      ),
      credit: (
        <div className="col-md-12">
          <div className=" ">
            <input
              type="number"
              min="0"
              step={0.01}
              placeholder=""
              defaultValue={parse_credit}
              className="form-control"
              name={nameT}
              htmlFor={r.type}
              placeholder="credit"
              onChange={(e) => editCell_credit(e, index)}
              id={cell_name_credit}
            />
          </div>
        </div>
      ),
    });
    return mmy;
  });

  function evaluateData(e) {
    e.preventDefault();
    let allDebit = [];
    let allCredit = [];

    totOpenBalance.length = 0;
    allDebit.length = 0;
    allCredit.length = 0;

    setisLoading(true);
    setisError("");

    console.log("cloneLedgers", cloneLedgers);
    let open = cloneLedgers.map((r, index) => {
      // console.log("obj2", obj2);
      let parseDebit = JSON.parse(r.debit);
      let parseCredit = JSON.parse(r.credit);
      allDebit.push(parseDebit[0]);
      allCredit.push(parseCredit[0]);
    });

    console.log("allDebit", allDebit);

    var sum_all_Debit = allDebit.reduce((x, y) => x + y);
    var total_all_Debit = sum_all_Debit.toFixed(2);

    console.log("total_all_Debit", total_all_Debit);

    var sum_all_Credit = allCredit.reduce((x, y) => x + y);
    var total_all_Credit = sum_all_Credit.toFixed(2);

    console.log("total_all_Credit", total_all_Credit);

    let difference = total_all_Credit - total_all_Debit;

    if (total_all_Debit === total_all_Credit) {
      console.log("equal", total_all_Debit + "" + total_all_Credit);

      let starting_date = $("#starting_date").val();
      if (starting_date !== "") {
        dispatch(
          saveOpenBalances({
            groupList: cloneLedgers,
            date_br: starting_date,
          })
        )
          .then((response) => {
            console.log("saved Opening Balances", response);
            setisLoading(false);
            dispatch(fetchOpeningBalance());
          })
          .catch(function (error) {
            console.log(error);
            setisLoading(false);
          });
      } else {
        Notification({ type: "error", message: "Please choose date" });
      }
    } else {
      Notification({ type: "error", message: "Debit & Credit mismatch" });
      setisError(
        <div>
          <b style={{ fontWeight: 800, color: "red" }}>
            Debit & Credit mismatch
          </b>
          <br />
          <b style={{ fontWeight: 800 }}>Total Credit: {total_all_Credit}</b>
          <br />{" "}
          <b style={{ fontWeight: 800 }}>Total Debit: {total_all_Debit}</b>
          <br /> <b style={{ fontWeight: 800 }}>Difference:{difference}</b>
        </div>
      );
      setisLoading(false);
    }
  }

  return (
    <div className="container mt-4">
      <div className="shadow overflow-hidden sm:rounded-md p-3 bg-white">
        <h3 className="col-md-12">Register Opening Balances</h3>
        <hr />

        <form onSubmit={evaluateData}>
          <div className="row mb-3">
            <div className="col-md-9">
              <label className="block text-sm font-medium text-gray-700">
                Starting Date
              </label>
              <input
                type="date"
                max={today_now_ddd}
                id="starting_date"
                required
                className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
              />
              <div>{isError}</div>
            </div>
            <div className="col-md-2">
              <label className="block text-sm font-medium text-gray-700">
                 
              </label>
              <button
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300 "
                style={{ marginTop: "3%" }}
                name=""
                type="submit"
                href="#"
                role="button"
              >
                {isLoading === true ? <Spinner /> : <></>} Evaluate & Save
              </button>
            </div>
          </div>
        </form>

        <Datatable
          data={openBToDisplay}
          keyForSearch={[{ key: "code_description", index: 0 }]}
          columns={columnsOpenBalances}
        />
      </div>
    </div>
  );
}

export default openingbalance;
