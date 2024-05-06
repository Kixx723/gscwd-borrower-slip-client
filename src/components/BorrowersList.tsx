"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Borrower, BorrowerListProps } from "@/utils/interfaces";
import { API_ENDPOINT_URL } from "@/utils/constants";
import { formatDate } from "@/utils/function";
import Modal from "./Modal";
import Link from "next/link";
import useBorrowerNameStore from "@/stores/useSearchBorrowerStore";
import { useRouter } from "next/navigation";
import useStatusFilterStore from "@/stores/useFilterBorrowerStore";

const BorrowersList: React.FC<BorrowerListProps> = ({ isEdit, setIsEdit }) => {
  const router = useRouter();
  const { searchBorrower } = useBorrowerNameStore();
  const { filterBorrower } = useStatusFilterStore();
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchBorrowers = async () => {
      try {
        const response = await axios.get<Borrower[]>(`${API_ENDPOINT_URL}/borrowers`);
        setBorrowers(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchBorrowers();
  }, [borrowers]);

  // const filteredBorrowers = borrowers.filter((borrower) => 
  //     borrower.name.toLowerCase().includes(searchBorrower.toLowerCase()) || 
  //     borrower.itemDescription.toLowerCase().includes(searchBorrower.toLowerCase()) 
  // );

  const filteredBorrowers = borrowers.filter((borrower) => 
    (filterBorrower === "All" || borrower.status === filterBorrower) && 
    (borrower.name.toLowerCase().includes(searchBorrower.toLowerCase()) || 
    borrower.itemDescription.toLowerCase().includes(searchBorrower.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBorrowers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <div className="flex flex-col items-center mt-2 justify-center">
      <div className="w-[80%] mx-auto overflow-hidden sm:rounded-lg border-b border-gray-200 shadow-2xl shadow-slate-500">
        <table className="w-full">
          <thead className="bg-blue-600 table-fixed h-15">
            <tr>
              <th className="px-6 py-3 border-b bg-border-gray-200 text-left text-sm leading-4 font-medium text-white uppercase tracking-wider">
                Borrowed By
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 font-medium text-white uppercase tracking-wider">
                ITEM/EQUIPMENT
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 font-medium text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 font-medium text-white uppercase tracking-wider">
                Date Borrowed
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 font-medium text-white uppercase tracking-wider">
                Date Returned
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm leading-4 font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.map((borrower) => (
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
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      borrower.status === "RETURNED"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {borrower.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800`}
                  >
                    {formatDate(borrower.createdAt)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      borrower.status === "RETURNED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {borrower.status === "RETURNED"
                      ? formatDate(borrower.updatedAt)
                      : "NOT YET RETURNED"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex gap-4">
                    <Link href={`/borrowers/${borrower.id}`}>
                      <button>
                        <span className="material-symbols-outlined hover:text-green-500">
                          visibility
                        </span>
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setIsEdit(true);
                        setSelectedBorrower(borrower);
                      }}
                    >
                      <span className="material-symbols-outlined hover:text-blue-500">
                        edit_square
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <nav className="flex items-center justify-center">
          <ul className="inline-flex space-x-2">
            {[...Array(Math.ceil(borrowers.length / itemsPerPage))].map(
              (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={isEdit}
        selectedBorrower={selectedBorrower}
      />
    </div>
  );
};

export default BorrowersList;
