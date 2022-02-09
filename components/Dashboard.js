import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import CompareArrowsOutlinedIcon from "@material-ui/icons/CompareArrowsOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import EqualizerOutlinedIcon from "@material-ui/icons/EqualizerOutlined";
import { useEffect, useState, Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
export default function Dashboard() {
  let [isOpen, setIsOpen] = useState(true);
  let [isOpen2, setIsOpen2] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <div className="flex items-center justify-center font-body mt-10">
        <div className="">
          <div className="p-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-10">
            <div className="transform scale-110 group  rounded-lg overflow-hidden shadow-lg bg-white text-center hover:opacity-80 cursor-pointer hover:-translate-y-2.5 hover:scale-120  hover:drop-shadow-lg hover:-translate-y-2.5 hover:scale-120  hover:drop-shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 group-hover">
                  <AccountBalanceWalletOutlinedIcon />
                </div>
                <p className="text-gray-700 text-base">Opening Balances</p>
              </div>
            </div>

            <div className="transform scale-110  rounded-lg overflow-hidden shadow-lg bg-white  text-center  hover:opacity-80 cursor-pointer hover:-translate-y-2.5 hover:scale-120  hover:drop-shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  <LibraryAddOutlinedIcon />
                </div>
                <p className="text-gray-700 text-base">Create Ledger</p>
              </div>
            </div>

            <div className="transform scale-110  rounded-lg overflow-hidden shadow-lg bg-white text-center hover:opacity-80 cursor-pointer hover:-translate-y-2.5 hover:scale-120  hover:drop-shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  <ReceiptOutlinedIcon />
                </div>
                <p className="text-gray-700 text-base">Receipt Voucher</p>
              </div>
            </div>

            <div className="transform scale-110  rounded-lg overflow-hidden shadow-lg bg-white text-center hover:opacity-80 cursor-pointer hover:-translate-y-2.5 hover:scale-120  hover:drop-shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  <PaymentOutlinedIcon />
                </div>
                <p className="text-gray-700 text-base">Payment Voucher</p>
              </div>
            </div>

            <div className="transform scale-110  rounded-lg overflow-hidden shadow-lg bg-white text-center hover:opacity-80 cursor-pointer hover:-translate-y-2.5 hover:scale-120  hover:drop-shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  <CompareArrowsOutlinedIcon />
                </div>
                <p className="text-gray-700 text-base">Contra Entry</p>
              </div>
            </div>

            <div className="transform scale-110  rounded-lg overflow-hidden shadow-lg bg-white text-center hover:opacity-80 cursor-pointer hover:-translate-y-2.5 hover:scale-120  hover:drop-shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  <MenuBookOutlinedIcon />
                </div>
                <p className="text-gray-700 text-base">Journal</p>
              </div>
            </div>

            <div className="transform scale-110  rounded-lg overflow-hidden shadow-lg bg-white text-center hover:opacity-80 cursor-pointer hover:-translate-y-2.5 hover:scale-120  hover:drop-shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">
                  <EqualizerOutlinedIcon />
                </div>
                <p className="text-gray-700 text-base">Report</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
