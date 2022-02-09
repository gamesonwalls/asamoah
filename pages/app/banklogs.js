import React, { useState } from "react";
import {
  PlusCircleIcon,
  XIcon,
  CheckIcon,
  CloudUploadIcon,
} from "@heroicons/react/solid";

import { Modal, Button } from "antd";

export default function componentName() {
  const [isModalVisibleAddBankLog, setisModalVisibleAddBankLog] =
    useState(false);

  const [isModalVisibleViewLog, setisModalVisibleViewLog] = useState(false);

  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const showModalBankLog = () => {
    setisModalVisibleAddBankLog(true);
  };

  const showModalViewLog = () => {
    setisModalVisibleViewLog(true);
  };

  const handleCancel = () => {
    setisModalVisibleAddBankLog(false);
    setisModalVisibleViewLog(false);
  };

  function handleCoverImage(e) {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      let reader = new FileReader();
      reader.onload = (event) => {
        setCoverImagePreview(reader.result);
        setCoverImage(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("only Images are supported here");
    }
  }

  let $imagePreview = null;
  if (coverImagePreview) {
    $imagePreview = (
      <img
        src={coverImagePreview}
        alt=""
        className="m-0 w-20 "
        style={{
          border: "2px solid #f5f5f5",

          // width: 200,
          height: 120,
        }}
      />
    );
  } else {
    $imagePreview = (
      <div className="flex flex-col items-center justify-center pt-7">
        <CloudUploadIcon className="w-12 h-12 text-gray-400 group-hover:text-gray-600" />
        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
          Upload Image
        </p>
      </div>
    );
  }
  return (
    <>
      <main>
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
          <div className="mb-1 w-full">
            <div className="mb-4">
              <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  <li className="inline-flex items-center">
                    <a
                      href="#"
                      className="text-gray-700 hover:text-gray-900 inline-flex items-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                      </svg>
                      Home
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium"
                      >
                        Users
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span
                        className="text-gray-400 ml-1 md:ml-2 text-sm font-medium"
                        aria-current="page"
                      >
                        List
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Bank Logs
              </h1>
            </div>
            <div className="sm:flex">
              <div className="sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                <form className="lg:pr-3" action="#" method="GET">
                  <label htmlFor="users-search" className="sr-only">
                    Search
                  </label>
                  <div className="mt-1 flex relative lg:w-64 xl:w-96">
                    <input
                      type="text"
                      name="email"
                      id="users-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="Search..."
                    />
                  </div>
                </form>
                <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                <button
                  type="button"
                  onClick={showModalBankLog}
                  className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                >
                  <svg
                    className="-ml-1 mr-2 h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add Bank Log
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden">
                <table className="table-fixed min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        BALANCE
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        PROOF
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        TYPE
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        INFO
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        GENDER
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        DOB
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        STATE
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        CARRIER
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        PIN CARRIER
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        CC
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        ATM PIN
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        AR/RN
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        SSN
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        ZELLE
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        wire transfer
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        DL
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Code
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Net Price
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Bid Price
                      </th>

                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Seller
                      </th>

                      <th scope="col" className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-100">
                      <td className="p-4 w-4">
                        <div
                          className="flex cursor-pointer"
                          onClick={showModalViewLog}
                        >
                          <PlusCircleIcon
                            width={20}
                            className="mr-1 hover:text-cyan-700"
                          />{" "}
                          <span>$784158</span>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base ">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://demo.themesberg.com/windster/images/users/neil-sims.png"
                          alt="Neil Sims avatar"
                        />
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <div class="text-sm font-normal text-gray-500">
                          <div class="text-base font-semibold text-gray-900">
                            Other
                          </div>
                          <div class="text-sm font-normal text-gray-500">
                            Credit Only
                          </div>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        United States
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                        <div className="flex items-center">Male</div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        Dob
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        Alabama
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        ATT
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <XIcon
                          width={20}
                          className="hover:text-cyan-700 text-red-600"
                        />
                      </td>

                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <XIcon
                          width={20}
                          className="hover:text-cyan-700 text-red-600"
                        />
                      </td>

                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <XIcon
                          width={20}
                          className="hover:text-cyan-700 text-red-600"
                        />
                      </td>

                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <CheckIcon
                          width={20}
                          className="hover:text-cyan-700 text-green-500"
                        />
                      </td>

                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <CheckIcon
                          width={20}
                          className="hover:text-cyan-700 text-green-500"
                        />
                      </td>

                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <XIcon
                          width={20}
                          className="hover:text-cyan-700 text-red-600"
                        />
                      </td>

                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <XIcon
                          width={20}
                          className="hover:text-cyan-700 text-red-600"
                        />
                      </td>

                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <XIcon
                          width={20}
                          className="hover:text-cyan-700 text-red-600"
                        />
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        ARN-839
                      </td>

                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <div className="text-green-500 hover:text-cyan">
                          $400
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <div className="text-yellow-500 hover:text-cyan">
                          $200
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <div className="hover:text-cyan">Us**13947</div>
                      </td>

                      <td className="p-4 whitespace-nowrap space-x-2">
                        <button
                          type="button"
                          data-modal-toggle="user-modal"
                          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                        >
                          Edit user
                        </button>
                        <button
                          type="button"
                          data-modal-toggle="delete-user-modal"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                        >
                          Delete user
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Modal
          title="Add Bank Log"
          visible={isModalVisibleAddBankLog}
          onCancel={handleCancel}
          footer={null}
          width={"60%"}
          // style={{ borderRadius: 10, background: "red" }}
          // bodyStyle={{ background: "red" }}
        >
          <div className=" w-full px-4 h-full md:h-auto">
            <div className="bg-white rounded-lg shadow relative">
              <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">Add product</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="add-product-modal"
                ></button>
              </div>

              <div className="p-6 space-y-6">
                <form action="#">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Balance ($)
                      </label>
                      <input
                        type="text"
                        name="product-name"
                        id="product-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder=""
                        required=""
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="category"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Type
                      </label>
                      <select
                        id="type"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option></option>
                        <option>Wells</option>
                        <option>Chase</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="category"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Category
                      </label>
                      <select
                        id="categories"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option></option>
                        <option>Checking Only</option>
                        <option>Saving Only</option>
                        <option>Saving + Checking</option>
                        <option>Credit + Checking +Saving </option>
                      </select>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="product-details"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Description
                      </label>
                      <textarea
                        id="product-details"
                        rows="6"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                        placeholder=""
                      ></textarea>
                    </div>
                    <hr className="col-span-full" />

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Dob
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required=""
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required=""
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Carrier
                      </label>
                      <input
                        type="text"
                        name="carrier"
                        id="carrier"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required=""
                      />
                    </div>
                    <hr className="col-span-full" />

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Pin Carrier
                      </label>

                      <ul className="flex d mb-0">
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioPinCarrierYes"
                                name="pinCarrier"
                                defaultValue="Yes"
                                //onClick={insureOrNot}
                                defaultChecked
                                required
                              />
                              <label
                                htmlFor="radioPinCarrierYes"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                Yes
                              </label>
                            </div>
                          </fieldset>
                        </li>
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioPinCarrierNo"
                                name="pinCarrier"
                                defaultValue="No"
                                // onClick={insureOrNot}
                                required
                              />
                              <label
                                htmlFor="radioPinCarrierNo"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                No
                              </label>
                            </div>
                          </fieldset>
                        </li>
                      </ul>
                    </div>

                    {/** CC */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        CC
                      </label>

                      <ul className="flex d mb-0">
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioCCYes"
                                name="ccCarrier"
                                defaultValue="Yes"
                                //onClick={insureOrNot}
                                defaultChecked
                                required
                              />
                              <label
                                htmlFor="radioCCYes"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                Yes
                              </label>
                            </div>
                          </fieldset>
                        </li>
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioCCNo"
                                name="ccCarrier"
                                defaultValue="No"
                                // onClick={insureOrNot}
                                required
                              />
                              <label
                                htmlFor="radioCCNo"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                No
                              </label>
                            </div>
                          </fieldset>
                        </li>
                      </ul>
                    </div>

                    {/** PIN ATM */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        PIN ATM
                      </label>

                      <ul className="flex d mb-0">
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioPINATMYes"
                                name="pinATM"
                                defaultValue="Yes"
                                //onClick={insureOrNot}
                                defaultChecked
                                required
                              />
                              <label
                                htmlFor="radioPINATMYes"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                Yes
                              </label>
                            </div>
                          </fieldset>
                        </li>
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioPINATMNO"
                                name="pinATM"
                                defaultValue="No"
                                // onClick={insureOrNot}
                                required
                              />
                              <label
                                htmlFor="radioPINATMNO"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                No
                              </label>
                            </div>
                          </fieldset>
                        </li>
                      </ul>
                    </div>

                    {/** AN /RN */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        AN /RN
                      </label>

                      <ul className="flex d mb-0">
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioANRNYes"
                                name="arrn"
                                defaultValue="Yes"
                                //onClick={insureOrNot}
                                defaultChecked
                                required
                              />
                              <label
                                htmlFor="radioANRNYes"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                Yes
                              </label>
                            </div>
                          </fieldset>
                        </li>
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioANRNNo"
                                name="arrn"
                                defaultValue="No"
                                // onClick={insureOrNot}
                                required
                              />
                              <label
                                htmlFor="radioANRNNo"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                No
                              </label>
                            </div>
                          </fieldset>
                        </li>
                      </ul>
                    </div>

                    {/** SSN */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        AN /RN
                      </label>

                      <ul className="flex d mb-0">
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioSSNYes"
                                name="ssn"
                                defaultValue="Yes"
                                //onClick={insureOrNot}
                                defaultChecked
                                required
                              />
                              <label
                                htmlFor="radioSSNYes"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                Yes
                              </label>
                            </div>
                          </fieldset>
                        </li>
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioSSNNO"
                                name="ssn"
                                defaultValue="No"
                                // onClick={insureOrNot}
                                required
                              />
                              <label
                                htmlFor="radioSSNNO"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                No
                              </label>
                            </div>
                          </fieldset>
                        </li>
                      </ul>
                    </div>

                    {/** ZELLE */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        ZELLE
                      </label>

                      <ul className="flex d mb-0">
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioZELLEYes"
                                name="zelle"
                                defaultValue="Yes"
                                //onClick={insureOrNot}
                                defaultChecked
                                required
                              />
                              <label
                                htmlFor="radioZELLEYes"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                Yes
                              </label>
                            </div>
                          </fieldset>
                        </li>
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioZELLENo"
                                name="zelle"
                                defaultValue="No"
                                // onClick={insureOrNot}
                                required
                              />
                              <label
                                htmlFor="radioZELLENo"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                No
                              </label>
                            </div>
                          </fieldset>
                        </li>
                      </ul>
                    </div>

                    {/** WIRE TRANSFER */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        WIRE TRANSFER
                      </label>

                      <ul className="flex d mb-0">
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioWTYes"
                                name="wireTransfer"
                                defaultValue="Yes"
                                //onClick={insureOrNot}
                                defaultChecked
                                required
                              />
                              <label
                                htmlFor="radioWTYes"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                Yes
                              </label>
                            </div>
                          </fieldset>
                        </li>
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioWTNo"
                                name="wireTransfer"
                                defaultValue="No"
                                // onClick={insureOrNot}
                                required
                              />
                              <label
                                htmlFor="radioWTNo"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                No
                              </label>
                            </div>
                          </fieldset>
                        </li>
                      </ul>
                    </div>

                    {/** DL */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        DL
                      </label>

                      <ul className="flex d mb-0">
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioDLYes"
                                name="dl"
                                defaultValue="Yes"
                                //onClick={insureOrNot}
                                defaultChecked
                                required
                              />
                              <label
                                htmlFor="radioDLYes"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                Yes
                              </label>
                            </div>
                          </fieldset>
                        </li>
                        <li className="d-inline-block mr-2 mb-1">
                          <fieldset>
                            <div className="radio radio-shadow">
                              <input
                                type="radio"
                                id="radioDLNo"
                                name="dl"
                                defaultValue="No"
                                // onClick={insureOrNot}
                                required
                              />
                              <label
                                htmlFor="radioDLNo"
                                className="text-sm font-medium text-gray-900  mr-2"
                              >
                                {" "}
                                No
                              </label>
                            </div>
                          </fieldset>
                        </li>
                      </ul>
                    </div>

                    {/** Net Price */}

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="product-name"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Net Price($)
                      </label>
                      <input
                        type="text"
                        name="net_price"
                        id="net_price"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required=""
                      />
                    </div>

                    {/** Bid Price */}

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="ryname"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Bid Price($)
                      </label>
                      <input
                        type="text"
                        name="bid_price"
                        id="bid_price"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required=""
                      />
                    </div>

                    <div className="col-span-full">
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700">
                          Image
                        </label>
                        <div className="flex items-center  w-full">
                          <label className="overflow-hidden flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            {$imagePreview}
                            <input
                              type="file"
                              className="opacity-0"
                              onChange={handleCoverImage}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-200 rounded-b">
                <button
                  className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  type="submit"
                >
                  Save Log
                </button>
              </div>
            </div>
          </div>
        </Modal>

        {/**Preview */}
        <Modal
          title="Preview"
          visible={isModalVisibleViewLog}
          onCancel={handleCancel}
          footer={null}
          width={"70%"}
        >
          <div class="grid grid-cols-3 gap-4">
            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Balance($):
              </label>
              <span className="ml-2 font-medium text-gray-900 block mb-2">
                3892
              </span>
            </div>
            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Type:
              </label>
              <span className="ml-2 font-medium"> Other ~ (Credit Only)</span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Info
              </label>
              <span className="ml-2">3892</span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Carrier
              </label>
              <span className="ml-2">ATT</span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Pin Carrier
              </label>
              <span className="ml-2">
                <XIcon
                  width={20}
                  className="hover:text-cyan-700 text-red-600"
                />
              </span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                CC
              </label>
              <span className="ml-2">
                <XIcon
                  width={20}
                  className="hover:text-cyan-700 text-red-600"
                />
              </span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                ATM PIN
              </label>
              <span className="ml-2">
                <XIcon
                  width={20}
                  className="hover:text-cyan-700 text-red-600"
                />
              </span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                AR/RN
              </label>
              <span className="ml-2">
                <XIcon
                  width={20}
                  className="hover:text-cyan-700 text-red-600"
                />
              </span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                SSN
              </label>
              <span className="ml-2">
                <CheckIcon
                  width={20}
                  className="hover:text-cyan-700 text-green-500"
                />
              </span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                ZELLE
              </label>
              <span className="ml-2">
                <XIcon
                  width={20}
                  className="hover:text-cyan-700 text-red-600"
                />
              </span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                WIRE TRANSFER
              </label>
              <span className="ml-2">
                <XIcon
                  width={20}
                  className="hover:text-cyan-700 text-red-600"
                />
              </span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                DL
              </label>
              <span className="ml-2">
                <XIcon
                  width={20}
                  className="hover:text-cyan-700 text-red-600"
                />
              </span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                CODE:
              </label>
              <span
                className="ml-2  text-base font-medium text-gray-900"
                style={{ marginTop: -2 }}
              >
                ARN-839
              </span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                NET PRICE
              </label>
              <span className="ml-2 font-medium text-green-500 hover:text-cyan">
                $400
              </span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                BID PRICE
              </label>
              <span className="ml-2 font-medium text-yellow-500 hover:text-cyan">
                $200
              </span>
            </div>

            <div class="flex">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                SELLER
              </label>
              <span
                className=" font-medium ml-2 text-yellow-500 hover:text-cyan"
                style={{ marginTop: -2 }}
              >
                Us**13947
              </span>
            </div>

            <button
              type="button"
              className="col-span-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
            >
              <svg
                className="-ml-1 mr-2 h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Buy ( ARN-839)
            </button>
          </div>
        </Modal>
      </main>
    </>
  );
}
