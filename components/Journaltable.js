import React from "react";

export default function Journaltable({ data }) {
  return (
    <div>
      <Datatable
        data={journalToDisplay}
        keyForSearch={[{ key: "code_description", index: 0 }]}
        columns={columnsJournalVoucher}
      />
    </div>
  );
}
