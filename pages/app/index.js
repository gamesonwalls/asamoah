import React, { useState, useEffect } from "react";

import CTA from "../../components/CTA";
import InfoCard from "../../components/Cards/InfoCard";
import ChartCard from "../../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../../components/Chart/ChartLegend";
import PageTitle from "../../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../../icons";
import RoundIcon from "../../components/RoundIcon";
import response from "../../utils/demo/tableData";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button,
} from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../../utils/demo/chartsData";
import {
  BriefcaseIcon,
  CreditCardIcon,
  LibraryIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";

// import Script from "next/script";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <div className="md:px-8 sm:px-20 xs:px-5">
      <PageTitle>Dashboard</PageTitle>

      <CTA />

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2  xl:grid-cols-4">
        <InfoCard title="Your Orders" value="6389">
          <RoundIcon
            icon={ShoppingCartIcon}
            iconColorclassName="text-white"
            bgColorclassName="bg-white"
            className="mr-4 bg-gradient-to-r from-yellow-400 to-yellow-500"
          />
        </InfoCard>

        <InfoCard title="Bank Logs" value="$ 46,760.89">
          <RoundIcon
            icon={BriefcaseIcon}
            iconColorclassName="text-white"
            bgColorclassName="bg-white"
            className="mr-4 bg-gradient-to-r from-green-400  to-green-500"
          />
        </InfoCard>

        <InfoCard title="Cards" value="376">
          <RoundIcon
            icon={CreditCardIcon}
            iconColorclassName="text-white"
            bgColorclassName="bg-white"
            className="mr-4 bg-gradient-to-r from-blue-400  to-blue-500"
          />
        </InfoCard>

        <InfoCard title="Channel" value="35">
          <RoundIcon
            icon={UserGroupIcon}
            iconColorclassName="text-white"
            bgColorclassName="bg-white"
            className="mr-4  bg-gradient-to-r from-purple-400  to-purple-500"
          />
        </InfoCard>
      </div>

      <div className="grid gap-2 mb-8 md:grid-cols-2 xl:grid-cols-2">
        <div id="accordion-open" data-accordion="open">
          <h2 id="accordion-open-heading-1">
            <button
              type="button"
              className="flex items-center focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 justify-between p-5 w-full font-medium text-left border border-gray-200 dark:border-gray-700 border-b-0 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-xl"
              data-accordion-target="#accordion-open-body-1"
              aria-expanded="true"
              aria-controls="accordion-open-body-1"
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 shrink-0 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
                Card Stock
              </span>
              <CreditCardIcon width={20} />
            </button>
          </h2>
          <div
            id="accordion-open-body-1"
            aria-labelledby="accordion-open-heading-1"
          >
            <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 ">
              <p className="mb-2 text-gray-500 dark:text-gray-400 ">
                <div className="flex justify-between ">
                  <div className="flex items-center ">
                    <img
                      src="/assets/img/visa.png"
                      className="object-cover"
                      style={{ width: "35px" }}
                    />
                    <span className="ml-2">Visa Card</span>
                  </div>
                  <div className="h-5 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                    34
                  </div>
                </div>
                <hr className="mt-2" />
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400 ">
                <div className="flex justify-between ">
                  <div className="flex items-center ">
                    <img
                      src="/assets/img/master.png"
                      className="object-cover"
                      style={{ width: "35px" }}
                    />
                    <span className="ml-2">Master Card</span>
                  </div>
                  <div className="h-5 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                    56
                  </div>
                </div>
                <hr className="mt-2" />
              </p>

              <p className="mb-2 text-gray-500 dark:text-gray-400 ">
                <div className="flex justify-between ">
                  <div className="flex items-center ">
                    <img
                      src="/assets/img/express.png"
                      className="object-cover"
                      style={{ width: "35px" }}
                    />
                    <span className="ml-2">American Express Card</span>
                  </div>
                  <div className="h-5 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                    9
                  </div>
                </div>
                <hr className="mt-2" />
              </p>

              <p className="mb-2 text-gray-500 dark:text-gray-400 ">
                <div className="flex justify-between ">
                  <div className="flex items-center ">
                    <img
                      src="/assets/img/discover2.png"
                      className="object-cover"
                      style={{ width: "35px" }}
                    />
                    <span className="ml-2">Discover Card</span>
                  </div>
                  <div className="h-5 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                    12
                  </div>
                </div>
                <hr className="mt-2" />
              </p>
            </div>
          </div>
        </div>

        <div id="accordion-open" data-accordion="open">
          <h2 id="accordion-open-heading-1">
            <button
              type="button"
              className="flex items-center focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 justify-between p-5 w-full font-medium text-left border border-gray-200 dark:border-gray-700 border-b-0 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-xl"
              data-accordion-target="#accordion-open-body-1"
              aria-expanded="true"
              aria-controls="accordion-open-body-1"
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 shrink-0 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
                Bank Stock
              </span>
              <LibraryIcon width={20} />
            </button>
          </h2>
          <div
            id="accordion-open-body-1"
            aria-labelledby="accordion-open-heading-1"
          >
            <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 ">
              <p className="mb-2 text-gray-500 dark:text-gray-400 ">
                <div className="flex justify-between ">
                  <div className="flex items-center ">
                    <img
                      src="/assets/img/chase.png"
                      className="object-cover"
                      style={{ width: "35px" }}
                    />
                    <span className="ml-2">Chase </span>
                  </div>
                  <div className="h-5 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                    18
                  </div>
                </div>
                <hr className="mt-2" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10 code-preview rounded-xl bg-gradient-to-r  dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 sm:p-6">
        <h3>Activity</h3>
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Activity Info
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Base Info
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Cards Added
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple Imac 27"
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        Desktop PC
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        $1999
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        34
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        Laptop
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        $2999
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        66
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
