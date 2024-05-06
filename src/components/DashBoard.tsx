"use client";

import { useEffect, useState } from "react";
import { Borrower } from "@/utils/interfaces";
import axios from "axios";
import { API_ENDPOINT_URL } from "@/utils/constants";
import { formatDate, formatDateWithOutHourAndTime } from "@/utils/function";

export default function Dashboard() {
  // mag generate ug todays date na naka YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [date, setDate] = useState<string>(today);
  const [borrowedCount, setBorrowedCount] = useState<number>(0);
  const [returnedCount, setReturnedCount] = useState<number>(0);

  console.log(date);
  useEffect(() => {
    if (!date) {
      return;
    }
    const fetchBorrowersByDate = async () => {
      try {
        const response = await axios.get<Borrower[]>(
          `${API_ENDPOINT_URL}/borrowers/date-by?date=${date}`
        );
        console.log("date-res", response);
        setBorrowers(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchBorrowersByDate();
  }, [date]);

  useEffect(() => {
    const borrowedItems = borrowers.filter(
      (borrower) => formatDateWithOutHourAndTime(borrower.createdAt) === date 
    ).length;
    const returnedItems = borrowers.filter(
      (borrower) => formatDateWithOutHourAndTime(borrower.updatedAt) === date && borrower.status === 'RETURNED'
    ).length;

    setBorrowedCount(borrowedItems);
    setReturnedCount(returnedItems);
  }, [borrowers]);

  return (
    <div className="mt-5">
      <h1 className="text-3xl text-center font-semibold mb-6">Dashboard</h1>
      <div className="flex gap-4 w-[60%] mx-auto sm:rounded-lg">
        <div className="flex-1 rounded  p-4 bg-gradient-to-l from-sky-400 to-cyan-300 shadow-lg shadow-cyan-500">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Date</h2>

          {/* <p className="text-xl ml-5 my-3 text-gray-800">03/12/2024</p> */}
          <input
            className="text-xl ml-5 my-3 text-gray-800"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex-1 rounded p-4 bg-gradient-to-l from-red-400 to-red-300 shadow-lg shadow-red-500">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Borrowed</h2>

          <p className="text-2xl font-semibold ml-7 my-3 text-gray-800">{borrowedCount}</p>
        </div>
        <div className="flex-1 rounded p-4 bg-gradient-to-l from-green-400 to-green-300 shadow-lg shadow-green-500">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Returned</h2>
          <p className="text-2xl font-semibold ml-7 my-3 text-gray-800">{returnedCount}</p>
        </div>
      </div>

      {/* Table 1 for Borrower */}
      <div className="flex justify-center gap-10 mt-10">
        <div className="flex flex-col items-center">
        <h1 className="text-center text-xl font-bold mb-2">
              Borrowed List
        </h1>
          <div className="w-[100%] mx-auto overflow-hidden sm:rounded-lg border-b border-gray-200 shadow-2xl shadow-slate-500">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
              <table className="w-full text-sm text-left text-gray-800">
                <thead className=" bg-blue-600 table-fixed h-15 text-white">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      NAME
                    </th>
                    <th scope="col" className="py-3 px-6">
                      ITEM/EQUIPMENT
                    </th>
                    <th scope="col" className="py-3 px-6">
                      STATUS
                    </th>
                    <th scope="col" className="py-3 px-6">
                      DATE BORROWED
                    </th>
                  </tr>
                </thead>
                <tbody className="font-semibold">
                  {borrowers
                    .filter((borrower) => formatDateWithOutHourAndTime(borrower.createdAt) === date) 
                    .map((borrower) => (
                      <tr key={borrower.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900 font-bold">
                            {borrower.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900 font-medium">
                            {borrower.itemDescription}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800`}
                          >
                            BORROWED
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800`}
                          >
                            {formatDate(borrower.createdAt)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Table 2 for Returned */}
        <div className="flex flex-col items-center">
          <h1 className="text-center text-xl font-bold mb-2">
              Returned List
          </h1>
          <div className="w-[100%] mx-auto overflow-hidden sm:rounded-lg border-b border-gray-200 shadow-2xl shadow-slate-500">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
              <table className="w-full text-sm text-left text-gray-800">
                <thead className=" bg-blue-600 table-fixed h-15 text-white">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      NAME
                    </th>
                    <th scope="col" className="py-3 px-6">
                      ITEM/EQUIPMENT
                    </th>
                    <th scope="col" className="py-3 px-6">
                      STATUS
                    </th>
                    <th scope="col" className="py-3 px-6">
                      DATE RETURNED
                    </th>
                  </tr>
                </thead>
                <tbody className="font-semibold">
                  {borrowers
                    .filter((borrower) => formatDateWithOutHourAndTime(borrower.updatedAt) === date && borrower.status === 'RETURNED')
                    .map((borrower) => (
                      <tr key={borrower.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900 font-bold">
                            {borrower.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900 font-medium">
                            {borrower.itemDescription}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                          >
                            RETURNED
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800`}
                          >
                            {formatDate(borrower.updatedAt)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// {borrowers.filter(borrower => borrower.status !== 'Borrowed').map((borrower) => (
//   <tr key={borrower.id}>
//     <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{borrower.name}</td>
//     <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{borrower.itemDescription}</td>
//     <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//         {borrower.status}
//       </span>
//     </td>
//   </tr>
// ))}
