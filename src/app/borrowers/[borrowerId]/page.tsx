"use client";

import { API_ENDPOINT_URL } from "@/utils/constants";
import { Borrower } from "@/utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/function";
import Header from "@/components/Header";
import DotLoader from "react-spinners/DotLoader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BorrowerSlipPDF from "@/components/BorrowerSlipPDF";
import Image from "next/image";

export default function BorrowersSlip({ params }: any) {
  const [borrower, setBorrower] = useState<Borrower | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBorrower = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT_URL}/borrowers/${params.borrowerId}`
        );
        setBorrower(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchBorrower();
  }, [params.borrowerId]);

  if (loading) {
    return (
      <div className="mt-[15%] flex justify-center ">
        <DotLoader color={"#0000ff"} size={20} loading={loading} />
      </div>
    );
  }

  return (
    <>
      <Header title="ICTD BORROWER SLIP SYSTEM" />
      <div className="flex justify-between">
        <button
          onClick={() => history.back()}
          className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-5 text-l rounded-lg mt-8 ml-10"
        >
          Back
        </button>

        <div className="flex items-center">
          {/* <button className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-5 text-l rounded-lg mt-8 mr-10 flex items-center">
            <span className="material-symbols-outlined mr-2">download</span>
            Download
          </button> */}
          <PDFDownloadLink fileName={`borrower-slip-${borrower?.name}`} document={<BorrowerSlipPDF borrower={borrower} />}>
                    {({loading}) => loading ? <button>Loading Document...</button> :
                     <button className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-5 text-l rounded-lg mt-8 mr-10 flex items-center">
                      <span className="material-symbols-outlined mr-2">download</span>
                      Download
                    </button> }
          </PDFDownloadLink>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-5">
        <div className="w-[80%] px-20 sm:rounded-lg border-b border-gray-200 shadow-2xl shadow-slate-500">
          <div className="mt-5 relative">
            <p className="text-center font-semibold">
              Republic of the Philippines
            </p>
            <div className="absolute left-40">
              <Image src="/water.png" alt="Logo"  width={120} height={40} />
            </div>
            <h1 className="text-center text-2xl text-blue-500 font-bold">
              GENERAL SANTOS CITY WATER DISTRICT
            </h1>

            <p className="text-center font-semibold">
              E. Fernandez St., Brgy. Lagao, General Santos City
            </p>
            <p className="text-center font-semibold">
              Telephone No.:(083)552-3824
            </p>
            <p className="text-center font-semibold">
              E-mail Address: gscwaterdistrict@yahoo.com
            </p>
            <p className="text-center">
              <a
                href="https://gensanwater.gov.ph/"
                className="font-large text-blue-500 hover:text-blue-600 underline"
              >
                www.gensanwater.gov.ph
              </a>
            </p>
            <div className="">
              <hr className="border-black border mt-5" />
            </div>
          </div>

          <h1 className="text-3xl font-bold my-7 text-center">
              ICTD - BORROWER&apos;S SLIP
          </h1>

          <table className="table-auto w-full border-collapse border-4 border-black mb-4">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2" rowSpan={2}>
                  Item/Equipment Description
                </th>
                <th className="border border-black px-4 py-2" colSpan={2}>
                  Status
                </th>
              </tr> 
              <tr>
                <th className="border border-black px-4 py-2">Borrowed</th>
                <th className="border border-black px-4 py-2">Returned</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-36">
                <td className="border border-black px-4 py-2 text-center">
                  {borrower?.itemDescription}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  {borrower?.createdAt ? formatDate(borrower.createdAt) : ""}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  {borrower?.status === "BORROWED"
                    ? "NOT YET RETURNED"
                    : borrower?.status === "RETURNED"
                    ? formatDate(borrower.updatedAt || "")
                    : ""}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="font-semibold my-10 relative">
            <h1 className="text-left">Borrowed by: _______________________________</h1>
            <p className="absolute top-0 ml-32">{borrower?.name.toUpperCase()}</p>
            <p className="text-left ml-32 text-sm">Signature over Printed Name</p>
          </div>
        </div>
      </div>
    </>
  );
}
