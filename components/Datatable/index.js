import React, { useState } from "react";

// import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { Table } from "antd";

function index({ data, columns, keyForSearch }) {
  const [filteredInfo, setfilteredInfo] = useState({});
  const [sortedInfo, setsortedInfo] = useState({});

  const [searchText, setsearchText] = useState("");

  const [searchedColumn, setsearchedColumn] = useState("");

  // let columnsWithSearch = keyForSearch.map((r) => {
  //   let toR = Object.assign({}, columns[r.index], {
  //     filteredValue: filteredInfo[r.key] || null,
  //     onFilter: (value, record) => record.code_description.includes(value),
  //     sorter: (a, b) => a.code_description.length - b.code_description.length,
  //     sortOrder: sortedInfo.columnKey === r.key && sortedInfo.order,
  //   });
  // });

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //   }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={(node) => {
  //           this.searchInput = node;
  //         }}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{ marginBottom: 8, display: "block" }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => handleReset(clearFilters)}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({ closeDropdown: false });

  //             setsearchText(selectedKeys[0]);
  //             setsearchedColumn(dataIndex);
  //           }}
  //         >
  //           Filter
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       ? record[dataIndex]
  //           .toString()
  //           .toLowerCase()
  //           .includes(value.toLowerCase())
  //       : "",
  //   onFilterDropdownVisibleChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => this.searchInput.select(), 100);
  //     }
  //   },
  //   render: (text) =>
  //     this.state.searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ""}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  // handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setsearchText(selectedKeys[0]);
  //   setsearchedColumn(dataIndex);
  // };

  // handleReset = (clearFilters) => {
  //   clearFilters();
  //   setsearchText("");
  //   // this.setState({ searchText: '' });
  // };

  return <Table columns={columns} dataSource={data} />;
}

export default index;
