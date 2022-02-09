// import rows from './demo-data-rows.js';
/**
 * customOptions and customFilter are used for #demo 2
 * they serve as an example of how to customize the options and labels in the datatable
 */

const customOptions = {
  itemsPerPageOptions: [20000],
  showDownloadCSVButton: true,
};

const columns = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "year",
    label: "Year Registered",
  },
  {
    key: "water_baptised",
    label: "Water Baptised",
  },
];

const columnsChildrenToAdult = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  ,
  {
    key: "isChildToAdult",
    label: `Move State.`,
  },
  {
    key: "action",
    label: "Actions",
  },
];

const columnsAllMinistriesMinistry = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "position",
    label: "Position",
  },

  {
    key: "action",
    label: "Action",
  },
];

const columnsMinistries_Members = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
];

const columnsSoulswonthisyear = [
  {
    key: "full_name",
    label: "First Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "year",
    label: "Year Registered",
  },
  {
    key: "year",
    label: "Year Registered",
  },
  {
    key: "water_baptised",
    label: "Water Baptised",
  },

  {
    key: "baptised",
    label: "Holy Spirit Baptised",
  },
];

const columnFixedassets = [
  {
    key: "date_p",
    label: "date Purchased",
  },
  {
    key: "item",
    label: "item",
  },
  {
    key: "cost",
    label: "Cost",
  },
  {
    key: "receipt_num",
    label: "receipt Num",
  },

  {
    key: "serial_num",
    label: "Serial Num.",
  },
  {
    key: "label",
    label: "label",
  },
  {
    key: "location",
    label: "location",
  },
  {
    key: "date_added",
    label: "Date added",
  },
  ,
  {
    key: "remarks",
    label: "Remarks",
  },
  {
    key: "action",
    label: "Change Remarks",
  },
];

const columnFixedassets_viewOnly = [
  {
    key: "date_p",
    label: "DATE PURCHASED",
  },
  {
    key: "item",
    label: "ITEMS",
  },
  {
    key: "classification",
    label: `CLASSIFICATION.`,
  },
  {
    key: "cost",
    label: "COST",
  },
  {
    key: "receipt_num",
    label: "RECEIPT NUM",
  },

  {
    key: "serial_num",
    label: "SERIAL NUM.",
  },
  {
    key: "label",
    label: "LABEL",
  },
  {
    key: "location",
    label: "LOCATION",
  },
  {
    key: "date_added",
    label: "DATE ADDED",
  },
  ,
  {
    key: "remarks",
    label: "REMARKS",
  },
];

const columnsAllmembers = [
  {
    key: "full_name",
    label: "Full Name",
  },
  {
    key: "gender",
    label: `Gender.`,
  },
  {
    key: "phone",
    label: `Contact.`,
  },
];

const columnsAllmembersonCell = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "all_subgroups_view",
    label: `Home Cell`,
  },
  {
    key: "all_positions_view",
    label: `Position.`,
  },
  {
    key: "year_appointed",
    label: `Year Appointed.`,
  },
  {
    key: "action",
    label: "Bind to Group",
  },
];

const columnsAllmembersonBibleStudies = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "all_subgroups_view",
    label: `Bible Study Group.`,
  },
  {
    key: "all_positions_view",
    label: `Position.`,
  },
  {
    key: "year_appointed",
    label: `Year Appointed.`,
  },
  {
    key: "action",
    label: "Bind to Group",
  },
];

const columnsAllmembersonRegister = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "all_subgroups_view",
    label: `Cell Name.`,
  },
  {
    key: "all_positions_view",
    label: `Position.`,
  },
  {
    key: "gender",
    label: `Gender`,
  },
  {
    key: "attendance",
    label: "Attendance State",
  },
];

// const columnsAllmembersonRegister = [{

//     key: 'f_name',
//     label: 'First Name',
//   }, {
//     key: 's_name',
//     label: 'Last Name',
//   },{
//     key:'phone',
//     label:`Contact.`
//   },
//   {
//     key:'all_subgroups_view',
//     label:`Cell Name.`
//   },
//   {
//     key:'all_positions_view',
//     label:`Position.`
//   }
//   ,
//    {
//     key:'gender',
//     label:`Gender`
//   },
//    {
//     key:'attendance',
//     label:'Attendance State'
//   }

// ];

const columnsAllmembersonRegisterAllMinistries = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "gender",
    label: `Gender`,
  },
  {
    key: "attendance",
    label: "Attendance State",
  },
];

const columnsAllmembersonRegisterwithAtt = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "all_subgroups_view",
    label: `Cell Name.`,
  },
  {
    key: "gender",
    label: `Gender`,
  },
];

const columnsAllmembersonRegisterwithAttBS = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "all_subgroups_view",
    label: `Bible Study Group.`,
  },
  {
    key: "gender",
    label: `Gender`,
  },
];

const columnsAllmembersonRegisterwithAttHC = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "all_subgroups_view",
    label: `Home Cell(Subgroup)`,
  },
  {
    key: "gender",
    label: `Gender`,
  },
];

const columnsAllmembersAllMinistriesactivmembers = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "gender",
    label: `Gender`,
  },
];

const columnsAllmembersonRegisterbiblestudies = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "all_subgroups_view",
    label: `Bible Study Group.`,
  },
  {
    key: "all_positions_view",
    label: `Position.`,
  },
  {
    key: "gender",
    label: `Gender`,
  },
  {
    key: "attendance",
    label: "Attendance State",
  },
];

const columnsAllmembersonRegisterHomecell = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact.`,
  },
  {
    key: "all_subgroups_view",
    label: `Home Cell(Subgroup)`,
  },
  {
    key: "all_positions_view",
    label: `Position.`,
  },
  {
    key: "gender",
    label: `Gender`,
  },
  {
    key: "attendance",
    label: "Attendance State",
  },
];

const columnsSoulswon = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: `Contact`,
  },
  {
    key: "year",
    label: "Year Registered",
  },
];

const columnsGeneral = [
  {
    key: "id",
    label: "Id",
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "name",
    label: `Name`,
  },
];

const columnsAdditionalfunction = [
  {
    key: "name",
    label: "Activities",
  },

  {
    key: "date_created",
    label: "Date Created",
  },
  ,
  {
    key: "year",
    label: "Year ",
  },
];

const columnsSpectacularevents = [
  {
    key: "name",
    label: "Activities",
  },

  {
    key: "date_created",
    label: "Date Created",
  },
  {
    key: "key_identifiers",
    label: "Identified Persons",
  },
  {
    key: "year",
    label: "Year ",
  },
];

const columnsCashbook = [
  {
    key: "date_added",
    label: "Date",
  },

  {
    key: "voucher_num",
    label: "Voucher",
  },
  {
    key: "cheque_num",
    label: "Cheque #",
  },
  ,
  {
    key: "code_description",
    label: "Code-Description",
  },
  ,
  {
    key: "narration",
    label: "Narration ",
  },
  {
    key: "debit",
    label: "Receipt(Dr)",
  },
  {
    key: "credit",
    label: "Payment(Cr) ",
  },
  {
    key: "total",
    label: "Balance ",
  },
];

const columnsBank = [
  {
    key: "date_added",
    label: "Date",
  },

  {
    key: "voucher_num",
    label: "Voucher",
  },
  {
    key: "cheque_num",
    label: "Cheque #",
  },
  ,
  {
    key: "narration",
    label: "Narration ",
  },
  {
    key: "debit",
    label: "Receipt(Dr) ",
  },
  {
    key: "credit",
    label: "Payment(Cr) ",
  },
  {
    key: "balance",
    label: "Balance ",
  },
];

const columnsLedger = [
  {
    key: "date_added",
    label: "Date",
  },

  {
    key: "voucher_num",
    label: "Voucher No.",
  },
  {
    key: "cheque_num",
    label: "Cheque #",
  },
  ,
  {
    key: "code_description",
    label: "Bank/Cash/Journal",
  },
  {
    key: "narration",
    label: "Narration",
  },
  ,
  {
    key: "debit",
    label: "Debit ",
  },
  {
    key: "credit",
    label: "Credit ",
  },
  {
    key: "total",
    label: "Total ",
  },
];

const columnsEvents = [
  {
    key: "event_id",
    label: "Name",
  },

  {
    key: "event_name",
    label: "Event Name",
  },
  {
    key: "type",
    label: "Type",
  },
  ,
  {
    key: "date_of_event",
    label: "Date of Event ",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "souls",
    label: "Souls won",
  },
];

const columnsEventsSouls = [
  {
    key: "name",
    label: "Souls",
  },

  {
    key: "event_name",
    label: "Event",
  },
  {
    key: "event_type",
    label: "Type",
  },
  ,
  {
    key: "date_added",
    label: "Date of Event ",
  },
  {
    key: "HS_baptised",
    label: "Holy Spirit Baptised",
  },
  {
    key: "new_conv_class_state",
    label: "New Convert class",
  },
  {
    key: "membership_state",
    label: "Membership State",
  },
];

const columnsbacksliders = [
  {
    key: "f_name",
    label: "First Names",
  },
  {
    key: "s_name",
    label: "Surname",
  },
  {
    key: "phone",
    label: "Contact No.",
  },
  {
    key: "state",
    label: "State",
  },
  {
    key: "action",
    label: "Action",
  },
];

const columnsbacksliderspinned = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "phone",
    label: "Contact No.",
  },
  {
    key: "residence",
    label: `Residence`,
  },
  {
    key: "state",
    label: "State",
  },
  {
    key: "action",
    label: "Action",
  },
];

const columnsCells = [
  {
    key: "subgroup_name",
    label: "Cell Name",
  },

  {
    key: "action",
    label: "Action",
  },
];

const columnsBibleStudies = [
  {
    key: "subgroup_name",
    label: "Bible Studies Group Name",
  },

  {
    key: "action",
    label: "Action",
  },
];

const columnsDeaceased = [
  {
    key: "f_name",
    label: "First Name",
  },

  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "dob",
    label: "Date of Birth",
  },
  {
    key: "date_deceased",
    label: "Date deceased",
  },

  {
    key: "age",
    label: "Aged",
  },

  {
    key: "image",
    label: "Image",
  },
];

const columnsMarriageTeachings = [
  {
    key: "date",
    label: "Date",
  },
  {
    key: "topic",
    label: "Topic",
  },
  {
    key: "description",
    label: "Description",
  },

  {
    key: "action",
    label: "Action",
  },
];

const columnsMarriageBlessed = [
  {
    key: "date",
    label: "Date",
  },
  {
    key: "bridegroom_name",
    label: "Bridegroom Name",
  },
  {
    key: "bride_name",
    label: "Bride Name",
  },

  {
    key: "bride_maiden_name",
    label: "Bride Maiden Name",
  },

  {
    key: "minister_name",
    label: "Minister Officiator ",
  },
  {
    key: "description",
    label: "Short Description",
  },

  {
    key: "action",
    label: "Action",
  },
];

const columnsTeachers = [
  {
    key: "teacher_name",
    label: " Name",
  },

  {
    key: "year",
    label: " Year Added",
  },

  {
    key: "action",
    label: "Action",
  },
];

const columnsPublic_r = [
  {
    key: "p_title",
    label: " Name",
  },
  {
    key: "p_description",
    label: " Description",
  },

  {
    key: "created_on",
    label: "Date added",
  },

  {
    key: "action",
    label: "Action",
  },
];

const columnsAllMinistriesClasses = [
  {
    key: "date",
    label: "Date",
  },
  {
    key: "p_title",
    label: " Name",
  },
  {
    key: "p_description",
    label: " Description",
  },

  {
    key: "group",
    label: "Sub group",
  },
  {
    key: "isPastorPresent",
    label: "Minister Present",
  },

  {
    key: "action",
    label: "Action",
  },
];

const columnsNewconvertsatt = [
  {
    key: "name",
    label: " Name",
  },
  {
    key: "contact",
    label: " Description",
  },

  {
    key: "action",
    label: "Action",
  },
];

const columnsReceipt = [
  {
    key: "description",
    label: " Name",
  },
  {
    key: "receipt",
    label: " Receipt",
  },

  {
    key: "total",
    label: "Total",
  },
];

const columnsReceiptVoucher = [
  {
    key: "date",
    label: " Date",
  },
  {
    key: "voucher_num",
    label: " Voucher No.",
  },

  {
    key: "bank_cash",
    label: "Bank/Cash",
  },
  {
    key: "received_from",
    label: "Received from",
  },

  ,
  {
    key: "total",
    label: "Total",
  },
  {
    key: "action",
    label: "Action",
  },
];

const columnsJournalVoucher = [
  {
    key: "date",
    label: " Date",
  },
  {
    key: "voucher_num",
    label: " Voucher No.",
  },

  {
    key: "bank_cash",
    label: "Bank/Cash",
  },

  ,
  {
    key: "total",
    label: "Total",
  },
  {
    key: "action",
    label: "Action",
  },
];

const columnsPrintReceiptVoucher = [
  {
    key: "code_description",
    label: "Code Description",
  },

  {
    key: "narration",
    label: "Narration",
  },

  {
    key: "amount",
    label: "Amount",
  },
];

const columnsPaymentVoucher = [
  {
    key: "date",
    label: " Date",
  },
  {
    key: "voucher_num",
    label: " Voucher No.",
  },

  {
    key: "bank_cash",
    label: "Bank/Cash",
  },
  {
    key: "received_from",
    label: "Paid to",
  },
  {
    key: "total",
    label: "Total",
  },

  {
    key: "action",
    label: "Action",
  },
];

const columnsBalanceSheet = [
  {
    key: "description",
    label: " Items",
  },
  {
    key: "subtotal",
    label: " Subs",
  },

  {
    key: "total",
    label: "Grand Total",
  },
];

const columnsPayment = [
  {
    key: "description",
    label: " Name",
  },
  {
    key: "receipt",
    label: " Receipt",
  },

  {
    key: "total",
    label: "Total",
  },
];

const columnsBirths = [
  {
    key: "date_of_birth",
    label: "Date Born",
  },
  {
    key: "name_of_child",
    label: "Name",
  },
  ,
  {
    key: "parents_name",
    label: " Parents Name",
  },
  ,
  {
    key: "description",
    label: " Description",
  },
  {
    key: "gender",
    label: " Gender",
  },
  {
    key: "action",
    label: " Action",
  },
];

const ColumnAttendance = [
  {
    key: "mem_id",
    label: "#",
  },
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Surname",
  },
  {
    key: "phone",
    label: "Phone No.",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "marked",
    label: "Checker",
  },
];

const ColumnAttendanceAllMinistry = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Surname",
  },
  {
    key: "phone",
    label: "Phone No.",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "youth_class_name",
    label: "Class Name",
  },
  {
    key: "youth_class_type",
    label: "(Group)",
  },
  {
    key: "marked",
    label: "Checker",
  },
];

const ColumnBibleStudiesRegister = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Surname",
  },
  {
    key: "phone",
    label: "Phone No.",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "all_subgroups_view",
    label: `Bible Study Group.`,
  },
  {
    key: "agedt",
    label: "Age Dt",
  },
  {
    key: "marked",
    label: "Checker",
  },
];

const ColumnHomecellRegister = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Surname",
  },
  {
    key: "phone",
    label: "Phone No.",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "all_subgroups_view",
    label: `Home Cell(Subgroup) `,
  },
  {
    key: "agedt",
    label: "Age Dt",
  },
  {
    key: "marked",
    label: "Checker",
  },
];

const ColumnTrialBalance = [
  {
    key: "code",
    label: "Code",
  },
  {
    key: "key",
    label: "Narration",
  },
  {
    key: "debit",
    label: "Dr",
  },
  {
    key: "credit",
    label: "Cr",
  },
];

const ColumnEditLedger = [
  {
    key: "code",
    title: "Code",
    dataIndex: "code",
  },
  {
    key: "description",
    title: "Description",
    dataIndex: "description",
  },
  {
    key: "income_balance",
    title: "Income Statement / Balance Sheet",
    dataIndex: "income_balance",
  },
  {
    key: "p_l_b_s",
    title: "Sub Group",
    dataIndex: "p_l_b_s",
  },

  {
    key: "type",
    title: "Type",
    dataIndex: "type",
  },

  {
    key: "action",
    title: "Action",
    dataIndex: "action",
  },
];

const columnsLedgers = [
  {
    key: "code",
    label: "Code",
  },
  {
    key: "description",
    label: "Description",
  },
];

const columnsContraEnty = [
  {
    key: "date",
    label: "Date",
  },
  {
    key: "voucher_num",
    label: "Voucher",
  },
  ,
  {
    key: "received_from",
    label: " Debit",
  },
  ,
  {
    key: "paid_to",
    label: " Credit",
  },
  {
    key: "total",
    label: "Total",
  },
  {
    key: "action",
    label: " Action",
  },
];

const columnsPrintContraVoucher = [
  {
    key: "received_from_c",
    label: "Code-Description",
  },
  {
    key: "description_c",
    label: "Narration",
  },

  ,
  {
    key: "receipt_amount",
    label: "Receipt(GH¢)",
  },
  {
    key: "payment_amount",
    label: "Payment(GH¢)",
  },
];

const columnsPrintJournalVoucher = [
  {
    key: "account",
    label: "Code-Description",
  },
  {
    key: "description_c",
    label: "Narration",
  },

  ,
  {
    key: "amount_br_debit",
    label: "Debit",
  },
  {
    key: "amount_br_credit",
    label: "Credit",
  },
];

const columnsAdminPrivelege = [
  {
    key: "username",
    label: "username",
  },
  ,
  {
    key: "type",
    label: " Account Type",
  },
  {
    key: "action",
    label: "Action",
  },
];

const columnsAllSubgroups = [
  {
    key: "subgroup_id",
    label: "Subgroup id",
  },
  ,
  {
    key: "group_id",
    label: "Group Id",
  },
  {
    key: "subgroup_name",
    label: " Subgroup Name",
  },
  {
    key: "action",
    label: "Action",
  },
];

const columnsAllPositions = [
  {
    key: "position_id",
    label: "Position id",
  },
  ,
  {
    key: "position_name",
    label: "Position Name",
  },
  {
    key: "group_name",
    label: " Group Name",
  },
  {
    key: "subgroup_name",
    label: " Subgroup Name",
  },
  {
    key: "action",
    label: "Action",
  },
];

const columnsAllTitles = [
  {
    key: "title_name",
    label: "Title ",
  },
  ,
  {
    key: "created_on",
    label: "Created On",
  },
];

const columnsAllRecurringEvents = [
  {
    key: "event_name",
    label: "Event ",
  },
  ,
  {
    key: "created_on",
    label: "Created On",
  },
];

const columnsAllBanksSetting = [
  {
    key: "bank_name",
    label: "Bank ",
  },
  ,
  {
    key: "created_on",
    label: "Created On",
  },

  {
    key: "action",
    label: "Action",
  },
];

const columnsAllChildrennotDedicated = [
  {
    key: "f_name",
    label: "First Name",
  },
  {
    key: "s_name",
    label: "Last Name",
  },
  {
    key: "guardian_name",
    label: `Guardian Name.`,
  },
  {
    key: "guardian_phone",
    label: "Guardian Phone Num.",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default {
  columns,
  columnsAllmembers,
  columnsSoulswon,
  columnsAdditionalfunction,
  columnsGeneral,
  columnsCashbook,
  columnsBank,
  customOptions,
  columnsSoulswonthisyear,
  columnsEvents,
  columnsEventsSouls,
  columnsbacksliders,
  columnsbacksliderspinned,
  columnsCells,
  columnsBibleStudies,
  columnsMarriageTeachings,
  columnsAllmembersonCell,
  columnsAllmembersonBibleStudies,
  columnsAllmembersonRegister,
  columnsAllmembersonRegisterwithAtt,
  columnsAllmembersonRegisterwithAttBS,
  columnsAllmembersonRegisterwithAttHC,
  columnsAllmembersonRegisterbiblestudies,
  columnsAllmembersonRegisterHomecell,
  columnsAllmembersonRegisterAllMinistries,
  columnsTeachers,
  columnsPublic_r,
  columnsNewconvertsatt,
  columnsMarriageBlessed,
  columnsDeaceased,
  columnFixedassets,
  columnFixedassets_viewOnly,
  columnsReceipt,
  columnsPayment,
  columnsBalanceSheet,
  columnsLedger,
  // columnsOpenBalances,
  columnsAllMinistriesMinistry,
  columnsBirths,
  ColumnAttendance,
  columnsAllmembersAllMinistriesactivmembers,
  columnsAllMinistriesClasses,
  ColumnAttendanceAllMinistry,
  ColumnBibleStudiesRegister,
  ColumnHomecellRegister,
  ColumnTrialBalance,
  ColumnEditLedger,
  columnsReceiptVoucher,
  columnsPaymentVoucher,
  columnsJournalVoucher,
  columnsLedgers,
  columnsContraEnty,
  columnsAdminPrivelege,
  columnsPrintReceiptVoucher,
  columnsPrintContraVoucher,
  columnsAllSubgroups,
  columnsAllPositions,
  columnsAllTitles,
  columnsAllRecurringEvents,
  columnsAllBanksSetting,
  columnsMinistries_Members,
  columnsPrintJournalVoucher,
  columnsChildrenToAdult,
  columnsAllChildrennotDedicated,

  // rows,
};
