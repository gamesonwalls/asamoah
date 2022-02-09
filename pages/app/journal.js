import React, { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";

import { Tabs, message, Modal } from "antd";

import Datatable from "../../components/Datatable";
import Select from "react-select";
import Printreport from "../../components/Printreport";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";

import Spinner from "../../components/Spinner";

import {
  fetchJournals,
  fetchLedgerCodesBanksOnly,
  fetchLedgerCodesNonBankCash,
  fetchVoucherNumCheck,
  saveJournal,
  selectAllJournals,
  selectAllLedgersCodes,
} from "../../redux/slices/ledgerSlice";
import { PencilAltIcon, PrinterIcon, TrashIcon } from "@heroicons/react/solid";
import uuid from "react-uuid";

const { TabPane } = Tabs;

const columnsJournalVoucher = [
  {
    key: "date",
    title: "Date",
    dataIndex: "date",
  },
  {
    key: "voucher_num",
    title: " Voucher No.",
    dataIndex: "voucher_num",
  },
  ,
  {
    key: "bank_cash",
    title: "Type",
    dataIndex: "bank_cash",
  },
  ,
  {
    key: "total",
    title: " Total",
    dataIndex: "total",
  },

  {
    key: "action",
    title: " Action",
    dataIndex: "action",
  },
];

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

var today_now_ddd = year + "-" + mm + "-" + dd;
function journal() {
  const [LineUI, setLineUI] = useState([]);

  const [visiblePrint, setvisiblePrint] = useState(false);
  const [visibleEditData, setvisibleEditData] = useState(false);

  const componentRef = useRef();
  const dispatch = useDispatch();

  const [looperLengthNew, setlooperLengthNew] = useState(2);

  const [addMoreFields, setaddMoreFields] = useState([]);

  const [addMoreFieldsEdit, setaddMoreFieldsEdit] = useState([]);
  const [isClearable, setisClearable] = useState(false);
  const [searchData, setsearchData] = useState([]);

  const [printTableContent, setprintTableContent] = useState([]);

  const [displayTotals, setdisplayTotals] = useState("");

  const [groupAddedList, setgroupAddedList] = useState([]);

  const [showEditModalJournal, setshowEditModalJournal] = useState(false);

  const ledgerCodeStatus = useSelector((state) => state.ledger.status_lc);
  const ledgersCodesAll = useSelector(selectAllLedgersCodes);

  const journalStatus = useSelector((state) => state.ledger.status_jl);
  const journalAll = useSelector(selectAllJournals);

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    // setvisiblePrint(true);
    if (ledgerCodeStatus === "idle") {
      dispatch(fetchLedgerCodesNonBankCash())
        .then((response) => {
          console.log("fetchLedgerCodesNonBankCash @", response);
          const data = response.payload.map((r) =>
            Object.assign({}, r, {
              value: r.code,
              label: r.code + " - " + r.description,
              p_l_b_s: r.p_l_b_s,
            })
          );
          setsearchData(data);
        })

        .catch((error) => {
          console.log("Server not found", error);
        });

      dispatch(fetchLedgerCodesBanksOnly()).then((response) => {
        console.log("response @ fetchLedgerCodesBanksOnly");
      });
    } else if (ledgerCodeStatus === "success" && ledgersCodesAll.length === 0) {
      dispatch(fetchLedgerCodesNonBankCash()).then((response) => {
        console.log("fetchLedgerCodesNonBankCash 2 @", response);

        const data = response.payload.map((r) =>
          Object.assign({}, r, {
            value: r.code,
            label: r.code + " - " + r.description,
            p_l_b_s: r.p_l_b_s,
          })
        );

        setsearchData(data);
        // addLineMainInit(data, 2);
      });

      dispatch(fetchLedgerCodesBanksOnly())
        .then((response) => {
          console.log("response @ fetchLedgerCodesBanksOnly");
        })

        .catch((error) => {
          console.log("Server not found", error);
        });
    } else {
    }
    ///

    if (journalStatus === "idle") {
      dispatch(fetchJournals())
        .then((response) => {
          console.log("response @ fetchJournals", response);
        })

        .catch((error) => {
          console.log("Server not found", error);
        });
    } else if (journalStatus === "success" && journalAll.length === 0) {
      dispatch(fetchJournals())
        .then((response) => {
          console.log("response @ fetchJournals", response);
        })

        .catch((error) => {
          console.log("Server not found", error);
        });
    }
  }, []);

  function saveJournalEntry(e) {
    e.preventDefault();

    setisLoading(true);

    let date_br = $("#date_br").val();
    let voucher_br = $("#voucher_br").val();

    let sumDebit = [0];
    let sumCredit = [0];

    let groupAddedList = [];

    groupAddedList.length = 0;

    dispatch(fetchVoucherNumCheck(voucher_br))
      .then((response) => {
        console.log("@ fetchVoucherNumCheck", response);
        if (response.payload.msg === "existing") {
          message.error("Voucher Number exist", 2.5);
          setisLoading(false);
        } else {
          $("#check").html("");

          let arraylength = looperLengthNew;
          //alert('array length'+arraylength);

          for (var i = 0; i <= arraylength; i++) {
            let insider = $("#insider" + i).val();
            let narration_br = $("#narration_br" + i).val();
            let amount_br_debit = $("#amount_br_debit" + i).val();
            let amount_br_credit = $("#amount_br_credit" + i).val();
            let type = $("#type" + i).val();
            let p_l_b_s = $("#p_l_b_s" + i).val();

            var obj = {
              voucher_br: voucher_br,
              account: insider,
              narration: narration_br,
              description_c: narration_br,
              amount_br_debit: amount_br_debit,
              amount_br_credit: amount_br_credit,
              type: type,
              p_l_b_s: p_l_b_s,
            };
            groupAddedList.push(obj);

            sumCredit.push(parseFloat(amount_br_credit));
            sumDebit.push(parseFloat(amount_br_debit));

            console.log("i " + amount_br_credit);

            if (arraylength - 1 === i) {
              console.log("sum Credit", sumCredit);
              console.log("sum Debit", sumDebit);

              let filteredSumCredit = sumCredit.filter((n) => n);

              filteredSumCredit.push(0);
              let filteredSumDebit = sumDebit.filter((n) => n);
              filteredSumDebit.push(0);

              // let purifiedSumMinCredit = [...new Set(filteredSumCredit)];
              //  let purifiedSumMinDebit = [...new Set(filteredSumDebit)];

              var purifiedSumMinCredit = filteredSumCredit.filter(function (
                el
              ) {
                return el != null;
              });
              var purifiedSumMinDebit = filteredSumDebit.filter(function (el) {
                return el != null;
              });

              console.log("sum Credit 2", purifiedSumMinCredit);
              console.log("sum Debit 3", purifiedSumMinDebit);

              var sum_all_receiptDebit = purifiedSumMinDebit.reduce(
                (x, y) => x + y
              );
              var total_all_Debit = sum_all_receiptDebit.toFixed(2);

              var sum_all_receiptCredit = purifiedSumMinCredit.reduce(
                (x, y) => x + y
              );
              var total_all_Credit = sum_all_receiptCredit.toFixed(2);

              console.log(
                "total_all_Credit",
                sum_all_receiptCredit,
                "total_all_Debit",
                sum_all_receiptDebit
              );

              if (sum_all_receiptCredit === sum_all_receiptDebit) {
                console.log("loop ends");

                console.log("groupAddedList", groupAddedList);

                let newGroupAddedList = [];

                groupAddedList.map((r, index) => {
                  if (r.account === undefined) {
                  } else {
                    newGroupAddedList.push(r);
                  }
                });

                console.log("newGroupAddedList", newGroupAddedList);

                dispatch(
                  saveJournal({
                    date_br: date_br,
                    voucher_br: voucher_br,
                    groupList: newGroupAddedList,
                    receipt_payment: "receipt", //categories:categories
                  })
                )
                  .then((response) => {
                    console.log(response);

                    setisLoading(false);

                    let divMi = (
                      <div>
                        <span
                          style={{
                            fontFamily: "Raleway",
                            fontSize: "16px",
                            fontWeight: 600,
                          }}
                        >
                          <b>Voucher Number: </b>
                          {groupAddedList[0].voucher_br}
                        </span>
                        <br />
                        <span
                          style={{
                            fontFamily: "Raleway",
                            fontSize: "16px",
                            fontWeight: 600,
                          }}
                        >
                          <b>Voucher Date: </b>
                          {date_br}
                        </span>

                        <br />
                        <br />
                      </div>
                    );

                    var obj = {
                      account: <b>Total</b>,
                      amount_br_debit: total_all_Debit,
                      amount_br_credit: total_all_Credit,
                    };
                    groupAddedList.push(obj);

                    var purifiedgroupAddedList = groupAddedList.filter(
                      function (el) {
                        return el.account != null;
                      }
                    );

                    setprintTableContent(purifiedgroupAddedList);
                    setdisplayTotals(divMi);

                    // that.getallReceiptVouchersCrud();
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              } else {
                message.warning("Debit and Credit Mismatch", 2.5);
                setisLoading(false);
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
        setisLoading(false);
      });
  }

  function editJournal(e) {
    e.preventDefault();
    let arraylength = addMoreFields.length;

    console.log("arraylength save_br2", arraylength);

    let date_br = $("#date_br_md").val();
    let voucher_br = $("#voucher_br_md").val();

    let totDebit_edit = $("#totDebit_edit").text();
    let totCredit_edit = $("#totCredit_edit").text();

    let groupAddedList = [];

    groupAddedList.length = 0;

    let groupAddedListShadow = [];
    groupAddedListShadow.length = 0;

    $("#check").html("");

    if (arraylength > 0) {
      console.log("looperLength", looperLength);

      let arraylength = addMoreFields.length;

      console.log("arraylength", arraylength);

      for (var i = 0; i < arraylength; i++) {
        let insider = $("#insider_md" + i).val();
        let narration_br = $("#narration_br_md" + i).val();
        let amount_br_debit = $("#amount_br_debit_md" + i).val();
        let amount_br_credit = $("#amount_br_credit_md" + i).val();

        let type = $("#type_md" + i).val();
        let p_l_b_s = $("#p_l_b_s_md" + i).val();

        var obj = {
          account: insider,
          narration: narration_br,
          description_c: narration_br,
          amount_br_debit: amount_br_debit,
          amount_br_credit: amount_br_credit,
          type: type,
          p_l_b_s: p_l_b_s,
        };

        groupAddedList.push(obj);
        groupAddedListShadow.push(obj);

        if (arraylength - 1 === i) {
          console.log("loop ends");

          if (totDebit_edit === totCredit_edit) {
            console.log("groupAddedList", groupAddedList);
            console.log("groupAddedListShadow", groupAddedListShadow);

            let newGroupAddedList = [];

            groupAddedList.map((r, index) => {
              if (r.account === undefined) {
              } else {
                newGroupAddedList.push(r);
              }
            });

            console.log("newGroupAddedList", newGroupAddedList);

            axios
              .post("http://localhost:4000/api/UpdatepostJournal", {
                date_br: date_br,
                voucher_br: voucher_br,
                groupList: groupAddedListShadow,
                receipt_payment: "receipt", //categories:categories
              })
              .then((response) => {
                // alert('Data Updated');
                console.log("UpdateReceiveVoucher", response);
                if (response.data === "done") {
                  message
                    .loading("Saving...", 2.5)
                    .then(() => message.success("Saved succesfully", 2.5));
                  that.getallReceiptVouchersCrud();

                  let divMi = (
                    <div>
                      <span
                        style={{
                          fontFamily: "Raleway",
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        <b>Voucher Number: </b>
                        {newGroupAddedList[0].voucher_br}
                      </span>
                      <br />
                      <span
                        style={{
                          fontFamily: "Raleway",
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        <b>Voucher Date: </b>
                        {date_br}
                      </span>

                      <br />
                      <br />
                    </div>
                  );

                  that.handleCancel();
                  that.showModal2();

                  var obj = {
                    account: "Total",
                    amount_br_debit: totDebit_edit,
                    amount_br_credit: totCredit_edit,
                  };
                  groupAddedList.push(obj);

                  that.setState({
                    printModalContent: groupAddedList,
                    displays: divMi,
                  });

                  that.getallReceiptVouchersCrud();
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            message.warning("Debit andn Credit Mismatch", 2.5);
          }
        }
      }

      //check loop has stopped
    } else {
      alert("else initiated");
    }
  }

  function addLineMain(e, searchData) {
    e.preventDefault();
    let index = looperLengthNew;

    console.log("index for add", index);

    console.log("addLineMain index", index);

    let account_br = "account_br" + index;
    let narration_br = "narration_br" + index;
    let amount_br_debit = "amount_br_debit" + index;
    let amount_br_credit = "amount_br_credit" + index;
    let insider = "insider" + index;
    let type = "type" + index;
    let p_l_b_s = "p_l_b_s" + index;

    let area = "col-md-12" + "cD" + index;

    let selected = "insider" + index;

    let mms = (
      <div className="row" id={area} key={selected} style={{ padding: 0 }}>
        <div className="col-md-3">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700  mb-1">
              Account
            </label>
            <div>
              <Select
                options={searchData}
                isSearchable="true"
                isClearable={isClearable}
                //onChange={onChangeSelected}
                onChange={(e) => onChangeSelected(e, index)}
                name={selected}
                menuPosition={"fixed"}
              />

              <input
                type="text"
                id={insider}
                style={{ display: "none" }}
                required
              />
              <input
                type="text"
                id={type}
                style={{ display: "none" }}
                required
              />
              <input
                type="text"
                id={p_l_b_s}
                style={{ display: "none" }}
                required
              />
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Narration
            </label>
            <textarea
              required
              className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
              style={{ height: "36px" }}
              type="text"
              id={narration_br}
            />
          </div>
        </div>

        <div className="col-md-2">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Debit ¢
            </label>
            <input
              type="number"
              min="0"
              defaultValue="0"
              required
              id={amount_br_debit}
              onBlur={totCalculation_Debit}
              onKeyUp={totCalculation_Debit}
              className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="col-md-2">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Credit ¢
            </label>
            <input
              type="number"
              min="0"
              defaultValue="0"
              required
              id={amount_br_credit}
              onBlur={totCalculation_Credit}
              onKeyUp={totCalculation_Credit}
              className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="col-md-2" style={{ marginTop: 13 }}>
          <button
            value={index}
            className="form-control height mt-2 btn btn-danger text-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={(e) => remove5(e, index)}
          >
            <TrashIcon className="w-5 h-5 mr-auto ml-auto" />
          </button>
        </div>
      </div>
    );

    const documents = LineUI.concat(mms);

    setlooperLengthNew(looperLengthNew + 1);
    setLineUI(documents);

    totCalculation_Debit();
    totCalculation_Credit();
  }

  function totCalculation_Debit(e) {
    let arryDebit = [0];
    let index = LineUI.length + looperLengthNew;

    console.log("index", index);
    let amount_br_debit = "amount_br_debit" + index;

    for (var i = 0; i < index; i++) {
      let my = $("#amount_br_debit" + i).val();
      console.log("my" + i, my);

      arryDebit.push(parseFloat(my));

      let filtered = arryDebit.filter((n) => n);
      filtered.push(0);
      if (index - 1 === i) {
        var sum_all_receipt = filtered.reduce((x, y) => x + y);
        var total_all_receipt = sum_all_receipt.toFixed(2);

        console.log("total Debit", total_all_receipt);
        $("#totDebit").text(total_all_receipt);
      }
    }
  }

  function totCalculation_Credit(e) {
    let arryCredit = [0];
    let index = LineUI.length + looperLengthNew;

    console.log("index", index);
    let amount_br_credit = "amount_br_credit" + index;

    for (var i = 0; i < index; i++) {
      let my = $("#amount_br_credit" + i).val();
      console.log("my" + i, my);

      arryCredit.push(parseFloat(my));
      let filtered = arryCredit.filter((n) => n);
      filtered.push(0);

      if (index - 1 === i) {
        var sum_all_receipt = filtered.reduce((x, y) => x + y);
        var total_all_receipt = sum_all_receipt.toFixed(2);

        console.log("total credit", total_all_receipt);
        $("#totCredit").text(total_all_receipt);
      }
    }
  }

  function onChangeSelected(obj, index) {
    // alert('')
    console.log(obj);
    console.log("obj", obj);
    // console.log("id",this.props)
    console.log("key", index);
    //$("#insider").val(obj.label);

    $("#insider" + index).val(obj.label);
    $("#type" + index).val(obj.type);
    $("#p_l_b_s" + index).val(obj.p_l_b_s);
  }

  function onChangeSelectedEdit(obj, index) {
    $("#insider_md" + index).val(obj.label);
    $("#type_md" + index).val(obj.type);
    $("#p_l_b_s_md" + index).val(obj.p_l_b_s);
  }

  function handleCancelPrint() {
    console.log(e);
    // this.setState({
    //   visible: false,
    //   visiblePrint: false,
    //   looper: [],
    //   LineUI2: [],
    // });
    setvisiblePrint(false);

    // this.state.documents2.length=0;
  }

  function checkVoucherexist(e) {
    let voucher = $("#voucher_br_md").val();

    dispatch(fetchVoucherNumCheck(voucher))
      .then((response) => {
        if (response.msg == "existing") {
          console.log(response);
          // console.log('Matched');

          // $("#check").css("color","red");
          // $("#check").html('Voucher Number used');
          message.info(
            "Voucher Number already in use. Process if this is the Voucher Number you used for this particular entry",
            2.5
          );
          // $("#check").html("Voucher Number used");
        } else {
          $("#check").html("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function addLineMainSub2(e) {
    //
    let index = addMoreFields.length;

    console.log("index addLineMainSub2", index);

    // let account_br='account_br'+index
    // let narration_br='narration_br'+index
    // let amount_br_debit='amount_br_debit'+index
    //  let amount_br_credit='amount_br_credit'+index
    // let insider='insider'+index
    // let type='type'+index
    // let p_l_b_s='p_l_b_s'+index;

    let account_br = "account_br_md" + index;
    let narration_br = "narration_br_md" + index;
    let amount_br = "amount_br_md" + index;
    let insider = "insider_md" + index;
    let type = "type_md" + index;
    let p_l_b_s = "p_l_b_s_md" + index;

    let amount_br_debit = "amount_br_debit_md" + index;
    let amount_br_credit = "amount_br_credit_md" + index;

    let area = "col-md-12" + "c" + index;

    let selected = "insider_md" + index;

    let mms = (
      <div className="col-md-12" key={area} id={area} style={{ padding: 0 }}>
        <div className="col-md-3">
          <div className="form-group">
            <label className="control-label ">Account </label>

            <div>
              <Select
                options={searchData}
                isSearchable="true"
                isClearable={isClearable}
                onChange={onChangeSelected1}
                name={selected}
                menuPosition={"fixed"}
              />

              <input
                type="text"
                id={insider}
                style={{ display: "none" }}
                required
              />
              <input
                type="text"
                id={type}
                style={{ display: "none" }}
                required
              />
              <input
                type="text"
                id={p_l_b_s}
                style={{ display: "none" }}
                required
              />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label className="control-label ">Narration </label>

            <textarea
              required
              className="form-control"
              style={{ height: "36px" }}
              type="text"
              id={narration_br}
            />
          </div>
        </div>

        <div className="col-md-2">
          <div className="form-group">
            <label className="control-label ">Debit ¢</label>

            <input
              type="number"
              min="0"
              defaultValue="0"
              required
              id={amount_br_debit}
              onBlur={this.totCalculation_Debit_Edit}
              onKeyUp={this.totCalculation_Debit_Edit}
              className="form-control"
            />
          </div>
        </div>

        <div className="col-md-2">
          <div className="form-group">
            <label className="control-label ">Credit ¢</label>

            <input
              type="number"
              min="0"
              defaultValue="0"
              required
              id={amount_br_credit}
              onBlur={this.totCalculation_Credit_Edit}
              onKeyUp={this.totCalculation_Credit_Edit}
              className="form-control"
            />
          </div>
        </div>

        <div className="col-md-1">
          <button
            value={index}
            className="btn btn-danger"
            onClick={this.remove5_edit}
          >
            x
          </button>
        </div>
      </div>
    );

    const documents = addMoreFields.concat(mms);

    setaddMoreFields(documents);

    totCalculation_Debit_Edit();
    totCalculation_Credit_Edit();
  }

  function remove5(e, index) {
    e.preventDefault();
    console.log("Line ui", LineUI.length);
    console.log("remove5", index);

    if (LineUI.length >= 0) {
      if (index < 2) {
        message.warning("This field cannot be erased", 2);
      } else {
        let leftAllinput = LineUI.splice(index, 1);
        console.log("leftAllinput 5", LineUI);

        let id = "#col-md-12cD" + index;
        console.log("id", id);
        // alert(id)
        $(id).remove();

        totCalculation_Debit();
        totCalculation_Credit();
        setlooperLengthNew(looperLengthNew - 1);
      }
    } else {
      message.warning("This field cannot be erased", 2);
    }
  }

  function handleCancelEditJournal() {
    setshowEditModalJournal(false);
  }
  function collectData(row, type) {
    if (type === "edit") {
      setshowEditModalJournal(true);

      let code_description = JSON.parse(row.code_description);
      let narration = JSON.parse(row.narration);
      let amount = JSON.parse(row.credit);

      if (code_description.length >= 0) {
        //this.state.LineUI2.length=code_description.length;

        let dtL = code_description.map((r, index) => {
          let splitInput = r.split(" ");
          console.log("splitInput", splitInput);

          let index2 = this.state.searchData.findIndex(
            (x) => x.code == splitInput[0]
          );

          let parseNarration = JSON.parse(row.narration);
          let parseAmountDebit = JSON.parse(row.debit);
          let parseAmountCredit = JSON.parse(row.credit);

          let account_br = "account_br_md" + index;
          let narration_br = "narration_br_md" + index;
          let amount_br = "amount_br_md" + index;
          let insider = "insider_md" + index;
          let type = "type_md" + index;
          let p_l_b_s = "p_l_b_s_md" + index;

          let amount_br_debit = "amount_br_debit_md" + index;
          let amount_br_credit = "amount_br_credit_md" + index;

          let allNarration = parseNarration[index];

          let allAmountDebit = parseAmountDebit[index];
          let allAmountCredit = parseAmountCredit[index];

          let area = "col-md-12" + "c" + index;

          let sum_all_debit = parseAmountDebit.reduce((x, y) => x + y);
          let total_all_receipt_debit = sum_all_debit.toFixed(2);

          $("#totDebit_edit").text(total_all_receipt_debit);
          $("#totCredit_edit").text(total_all_receipt_debit);

          let mms = (
            <div
              className="col-md-12"
              key={area}
              id={area}
              style={{ padding: 0 }}
            >
              <div className="col-md-3">
                <div className="form-group">
                  <label className="control-label ">Account </label>

                  <div>
                    <Select
                      defaultValue={searchData[index2]}
                      options={searchData}
                      isSearchable="true"
                      isClearable={isClearable}
                      id={account_br}
                      onChange={(e) => onChangeSelectedEdit(e, index)}
                      menuPosition={"fixed"}
                    />

                    <input
                      type="text"
                      id={insider}
                      defaultValue={defaultInsider}
                      style={{ display: "none" }}
                      required
                    />
                    <input
                      type="text"
                      id={type}
                      defaultValue={defaultType}
                      style={{ display: "none" }}
                      required
                    />
                    <input
                      type="text"
                      id={p_l_b_s}
                      defaultValue={defaultP_l_b_s}
                      style={{ display: "none" }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label className="control-label ">Narration </label>

                  <textarea
                    required
                    className="form-control"
                    style={{ height: "36px" }}
                    defaultValue={allNarration}
                    type="text"
                    id={narration_br}
                  />
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group">
                  <label className="control-label ">Debit ¢</label>

                  <input
                    type="number"
                    min="0"
                    required
                    defaultValue={allAmountDebit}
                    id={amount_br_debit}
                    onBlur={this.totCalculation_Debit_Edit}
                    onKeyUp={this.totCalculation_Debit_Edit}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-group">
                  <label className="control-label ">Credit ¢</label>

                  <input
                    type="number"
                    min="0"
                    required
                    defaultValue={allAmountCredit}
                    id={amount_br_credit}
                    onBlur={this.totCalculation_Credit_Edit}
                    onKeyUp={this.totCalculation_Credit_Edit}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-1" style={{ marginTop: 13 }}>
                <button
                  value={index}
                  className="btn btn-danger"
                  onClick={this.remove5_edit}
                >
                  x
                </button>
              </div>
            </div>
          );
          return mms;
        });

        totCalculation_Debit_Edit();
        totCalculation_Credit_Edit();

        const documents = addMoreFieldsEdit.concat(dtL);

        setaddMoreFieldsEdit(documents);
      }
    } else {
    }
  }

  let journalToDisplay = journalAll.map((r) => {
    let totalT = JSON.parse(r.debit);
    let sum = totalT.reduce((x, y) => x + y);
    let total = sum.toFixed(2);

    return Object.assign({}, r, {
      key: uuid(),
      date: r.date_for_sorting,
      total: total,
      action: (
        <div className="flex" key={uuid()}>
          {" "}
          <button
            onClick={() => collectData(r, "edit")}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <PencilAltIcon className="h-5 w-5 " />
          </button>
          <button
            onClick={() => collectData(r, "delete")}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            <TrashIcon className="h-5 w-5 " />
          </button>
        </div>
      ),
    });
  });
  return (
    <div className="container mt-4">
      <div className="shadow overflow-hidden sm:rounded-md p-3 bg-white">
        <Modal
          visible={visiblePrint}
          title="Print Journal"
          onCancel={handleCancelPrint}
          maskClosable={false}
          width="70%"
          footer={null}
        >
          <div className="col-md-12">
            <div id="print" style={{ width: "100%" }}>
              <ReactToPrint
                trigger={() => (
                  <div className="flex justify-end">
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300">
                      <PrinterIcon className="w-5 h-5 mr-auto ml-auto" />
                      Print
                    </button>
                  </div>
                )}
                content={() => componentRef.current}
              />
              <Printreport
                printTableContent={printTableContent}
                displayTotals={displayTotals}
                ref={componentRef}
              />
            </div>
          </div>
        </Modal>

        <Modal
          visible={showEditModalJournal}
          title="Edit Journal"
          onCancel={handleCancelEditJournal}
          maskClosable={false}
          width="70%"
          footer={null}
        >
          <div className="row">
            <input type="text" style={{ display: "none" }} id="ine_index" />
            <input type="text" style={{ display: "none" }} id="ine_leg_id" />
            <input
              type="text"
              style={{ display: "none" }}
              id="ine_voucher_num"
            />

            <form onSubmit={editJournal}>
              <div className="row">
                <div className="col-md-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="form-group">
                    <input
                      type="date"
                      max={today_now_ddd}
                      className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                      id="date_br_md"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Voucher Number
                  </label>
                  <div className="input-group">
                    <input
                      id="voucher_br_md"
                      type="text"
                      // onKeyUp={checkVoucherexist}
                      className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                      placeholder="Voucher Number"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </div>
                  <div id="check"></div>
                </div>

                <div className="" id="AddUI">
                  <div className="d-flex justify-end mt-2">
                    {" "}
                    <button
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-black bg-gray-100 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300"
                      style={{ padding: 5 }}
                      onClick={(e) => {
                        addLineMain(e, searchData);
                      }}
                    >
                      + Add Line
                    </button>
                  </div>

                  {
                    ///Default Journal //
                  }

                  <div className="row" id="col-md-12cD0" style={{ padding: 0 }}>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700  mb-1">
                          Account
                        </label>
                        <div>
                          <Select
                            options={searchData}
                            isSearchable="true"
                            isClearable={isClearable}
                            onChange={(e) => onChangeSelected(e, 0)}
                            menuPosition={"fixed"}
                          />

                          <input
                            type="text"
                            id="insider0"
                            style={{ display: "none" }}
                            required
                          />
                          <input
                            type="text"
                            id="type0"
                            style={{ display: "none" }}
                            required
                          />
                          <input
                            type="text"
                            id="p_l_b_s0"
                            style={{ display: "none" }}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">
                          Narration
                        </label>
                        <textarea
                          required
                          className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                          style={{ height: "36px" }}
                          type="text"
                          id="narration_br0"
                        />
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">
                          Debit ¢
                        </label>
                        <input
                          type="number"
                          min="0"
                          defaultValue="0"
                          required
                          id="amount_br_debit0"
                          onBlur={totCalculation_Debit}
                          onKeyUp={totCalculation_Debit}
                          className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">
                          Credit ¢
                        </label>
                        <input
                          type="number"
                          min="0"
                          defaultValue="0"
                          required
                          id="amount_br_credit0"
                          onBlur={totCalculation_Credit}
                          onKeyUp={totCalculation_Credit}
                          className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="col-md-2" style={{ marginTop: 13 }}>
                      <button
                        value="0"
                        className="form-control height mt-2 btn btn-danger text-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e) => remove5(e, 0)}
                      >
                        <TrashIcon className="w-5 h-5 mr-auto ml-auto" />
                      </button>
                    </div>
                  </div>

                  <div className="row" id="col-md-12cD1" style={{ padding: 0 }}>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700  mb-1">
                          Account
                        </label>
                        <div>
                          <Select
                            options={searchData}
                            isSearchable="true"
                            isClearable={isClearable}
                            onChange={(e) => onChangeSelected(e, 1)}
                            menuPosition={"fixed"}
                          />

                          <input
                            type="text"
                            id="insider1"
                            style={{ display: "none" }}
                            required
                          />
                          <input
                            type="text"
                            id="type1"
                            style={{ display: "none" }}
                            required
                          />
                          <input
                            type="text"
                            id="p_l_b_s1"
                            style={{ display: "none" }}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">
                          Narration
                        </label>
                        <textarea
                          required
                          className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                          style={{ height: "36px" }}
                          type="text"
                          id="narration_br1"
                        />
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">
                          Debit ¢
                        </label>
                        <input
                          type="number"
                          min="0"
                          defaultValue="0"
                          required
                          id="amount_br_debit1"
                          onBlur={totCalculation_Debit}
                          onKeyUp={totCalculation_Debit}
                          className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">
                          Credit ¢
                        </label>
                        <input
                          type="number"
                          min="0"
                          defaultValue="0"
                          required
                          id="amount_br_credit1"
                          onBlur={totCalculation_Credit}
                          onKeyUp={totCalculation_Credit}
                          className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="col-md-2" style={{ marginTop: 13 }}>
                      <button
                        value="1"
                        className="form-control height mt-2 btn btn-danger text-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        // onClick={remove5}
                        onClick={(e) => remove5(e, 1)}
                      >
                        <TrashIcon className="w-5 h-5 mr-auto ml-auto" />
                      </button>
                    </div>
                  </div>

                  {LineUI}

                  {
                    /// End Default Journal //
                  }
                </div>

                <div className="col-md-8"></div>
                <div className="col-md-4 flex justify-between">
                  <h4 style={{ float: "right" }}>
                    Total Debit:<span id="totDebit">0.00</span>
                  </h4>

                  <h4 style={{ float: "right" }}>
                    Total Credit : <span id="totCredit">0.00</span>
                  </h4>
                </div>

                <div className="col-md-12" style={{ marginTop: 10 }}>
                  <button
                    type="submit"
                    className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300"
                  >
                    {isLoading === true ? <Spinner /> : <></>}
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>

        <Tabs defaultActiveKey="1" type="card" style={{ marginTop: 5 }}>
          <TabPane tab="Create Journal" key="1">
            <div id="bankreceiptUi" className="container">
              <h3> Journal Voucher</h3>
              <hr />

              <form onSubmit={saveJournalEntry}>
                <div className="row">
                  <div className="col-md-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <div className="form-group">
                      <input
                        type="date"
                        max={today_now_ddd}
                        className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                        id="date_br"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Voucher Number
                    </label>
                    <div className="input-group">
                      <input
                        id="voucher_br"
                        type="text"
                        // onKeyUp={checkVoucherexist}
                        className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                        placeholder="Voucher Number"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                    <div id="check"></div>
                  </div>

                  <div className="" id="AddUI">
                    <div className="d-flex justify-end mt-2">
                      {" "}
                      <button
                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-black bg-gray-100 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300"
                        style={{ padding: 5 }}
                        onClick={(e) => {
                          addLineMain(e, searchData);
                        }}
                      >
                        + Add Line
                      </button>
                    </div>

                    {
                      ///Default Journal //
                    }

                    <div
                      className="row"
                      id="col-md-12cD0"
                      style={{ padding: 0 }}
                    >
                      <div className="col-md-3">
                        <div className="form-group">
                          <label className="block text-sm font-medium text-gray-700  mb-1">
                            Account
                          </label>
                          <div>
                            <Select
                              options={searchData}
                              isSearchable="true"
                              isClearable={isClearable}
                              onChange={(e) => onChangeSelected(e, 0)}
                              menuPosition={"fixed"}
                            />

                            <input
                              type="text"
                              id="insider0"
                              style={{ display: "none" }}
                              required
                            />
                            <input
                              type="text"
                              id="type0"
                              style={{ display: "none" }}
                              required
                            />
                            <input
                              type="text"
                              id="p_l_b_s0"
                              style={{ display: "none" }}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label className="block text-sm font-medium text-gray-700">
                            Narration
                          </label>
                          <textarea
                            required
                            className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                            style={{ height: "36px" }}
                            type="text"
                            id="narration_br0"
                          />
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="form-group">
                          <label className="block text-sm font-medium text-gray-700">
                            Debit ¢
                          </label>
                          <input
                            type="number"
                            min="0"
                            defaultValue="0"
                            required
                            id="amount_br_debit0"
                            onBlur={totCalculation_Debit}
                            onKeyUp={totCalculation_Debit}
                            className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="form-group">
                          <label className="block text-sm font-medium text-gray-700">
                            Credit ¢
                          </label>
                          <input
                            type="number"
                            min="0"
                            defaultValue="0"
                            required
                            id="amount_br_credit0"
                            onBlur={totCalculation_Credit}
                            onKeyUp={totCalculation_Credit}
                            className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="col-md-2" style={{ marginTop: 13 }}>
                        <button
                          value="0"
                          className="form-control height mt-2 btn btn-danger text-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={(e) => remove5(e, 0)}
                        >
                          <TrashIcon className="w-5 h-5 mr-auto ml-auto" />
                        </button>
                      </div>
                    </div>

                    <div
                      className="row"
                      id="col-md-12cD1"
                      style={{ padding: 0 }}
                    >
                      <div className="col-md-3">
                        <div className="form-group">
                          <label className="block text-sm font-medium text-gray-700  mb-1">
                            Account
                          </label>
                          <div>
                            <Select
                              options={searchData}
                              isSearchable="true"
                              isClearable={isClearable}
                              onChange={(e) => onChangeSelected(e, 1)}
                              menuPosition={"fixed"}
                            />

                            <input
                              type="text"
                              id="insider1"
                              style={{ display: "none" }}
                              required
                            />
                            <input
                              type="text"
                              id="type1"
                              style={{ display: "none" }}
                              required
                            />
                            <input
                              type="text"
                              id="p_l_b_s1"
                              style={{ display: "none" }}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label className="block text-sm font-medium text-gray-700">
                            Narration
                          </label>
                          <textarea
                            required
                            className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                            style={{ height: "36px" }}
                            type="text"
                            id="narration_br1"
                          />
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="form-group">
                          <label className="block text-sm font-medium text-gray-700">
                            Debit ¢
                          </label>
                          <input
                            type="number"
                            min="0"
                            defaultValue="0"
                            required
                            id="amount_br_debit1"
                            onBlur={totCalculation_Debit}
                            onKeyUp={totCalculation_Debit}
                            className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="form-group">
                          <label className="block text-sm font-medium text-gray-700">
                            Credit ¢
                          </label>
                          <input
                            type="number"
                            min="0"
                            defaultValue="0"
                            required
                            id="amount_br_credit1"
                            onBlur={totCalculation_Credit}
                            onKeyUp={totCalculation_Credit}
                            className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="col-md-2" style={{ marginTop: 13 }}>
                        <button
                          value="1"
                          className="form-control height mt-2 btn btn-danger text-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          // onClick={remove5}
                          onClick={(e) => remove5(e, 1)}
                        >
                          <TrashIcon className="w-5 h-5 mr-auto ml-auto" />
                        </button>
                      </div>
                    </div>

                    {LineUI}

                    {
                      /// End Default Journal //
                    }
                  </div>

                  <div className="col-md-8"></div>
                  <div className="col-md-4 flex justify-between">
                    <h4 style={{ float: "right" }}>
                      Total Debit:<span id="totDebit">0.00</span>
                    </h4>

                    <h4 style={{ float: "right" }}>
                      Total Credit : <span id="totCredit">0.00</span>
                    </h4>
                  </div>

                  <div className="col-md-12" style={{ marginTop: 10 }}>
                    <button
                      type="submit"
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300"
                    >
                      {isLoading === true ? <Spinner /> : <></>}
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </TabPane>
          <TabPane tab="Journal Vouchers" key="2">
            <div className="col-md-12">
              <h3>Journal Voucher Table</h3>
              <hr />

              <Datatable
                data={journalToDisplay}
                keyForSearch={[{ key: "code_description", index: 0 }]}
                columns={columnsJournalVoucher}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default journal;
