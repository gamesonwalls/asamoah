import React from "react";

import Datatable from "./Datatable";

const columnsPrintJournalVoucher = [
  {
    key: "account",

    title: " Code-Description",
    dataIndex: "account",
  },
  {
    key: "description_c",

    title: " Narration",
    dataIndex: "description_c",
  },

  ,
  {
    key: "amount_br_debit",
    title: "Debit",
    dataIndex: "amount_br_debit",
  },
  {
    key: "amount_br_credit",
    title: "Credit",
    dataIndex: "amount_br_credit",
  },
];

var today_g = new Date();
var dd_g = today_g.getDate();
var mm_g = today_g.getMonth() + 1; //January is 0!
var year_g = today_g.getFullYear();

if (dd_g < 10) {
  dd_g = "0" + dd_g;
}
if (mm_g < 10) {
  mm_g = mm_g;
}

var today_now_g = dd_g + "-" + mm_g + "-" + year_g;

var time =
  today_g.getHours() + ":" + today_g.getMinutes() + ":" + today_g.getSeconds();

const Printreport = React.forwardRef((props, ref) => {
  return (
    <div className="col-md-12" ref={ref}>
      <div className="col-md-12">
        <div style={{ fontSize: "18px", fontWeight: 600 }}>
          NITRO ACCOUNTING
        </div>
      </div>

      <hr />

      <div className="col-md-12">
        {
          //   <img
          //   alt="..."
          //   src={Logo}
          //   style={{ height: 80, width: 90 }}
          //   className="img-responsive center-block"
          // />
        }
      </div>

      <h3> Journal</h3>
      <div className="col-md-12">
        <span
          style={{
            fontSize: "13px",
            marginBottom: 3,
            fontWeight: 600,
          }}
        >
          Date: {today_now_g}
        </span>
        <span
          style={{
            fontSize: "13px",
            marginBottom: 3,
            fontWeight: 600,
          }}
        >
          {" "}
          Time: {time}
        </span>
      </div>

      <div className="col-md-12">
        <br />
        <br />

        {
          //props.displays
        }
      </div>

      <Datatable
        //data={[]}
        data={props.printTableContent}
        keyForSearch={[{ key: "code_description", index: 0 }]}
        columns={columnsPrintJournalVoucher}
      />

      <br />

      <div className="mb-3 flex justify-between">
        <span>
          <b>Prepared By:...........................</b>
        </span>
        <span>
          <b>Authorized By:............................</b>
        </span>
      </div>
    </div>
  );
});

export default Printreport;
