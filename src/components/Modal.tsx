"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT_URL } from "@/utils/constants";
import { ModalProps } from "@/utils/interfaces";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, isEdit,  selectedBorrower }) => {
  const [borrowerName, setBorrowerName] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isEdit && selectedBorrower) {
      setBorrowerName(selectedBorrower.name);
      setItem(selectedBorrower.itemDescription);
      setStatus(selectedBorrower.status);
    } else {
      setBorrowerName("");
      setItem("");
      setStatus("BORROWED"); 
    }
  }, [selectedBorrower, isEdit]);

  if (!showModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: borrowerName,
      itemDescription: item,
      status: status
    };

    try {
      setIsSubmitting(true);

      if (isEdit && selectedBorrower) {
          const hasChanges =
          selectedBorrower.name !== borrowerName ||
          selectedBorrower.itemDescription !== item ||
          selectedBorrower.status !== status;

        if (hasChanges) {
          await axios.put(`${API_ENDPOINT_URL}/borrowers/${selectedBorrower.id}`, payload);
          toast.info('Changes Successful! 🎉', {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          // No changes made, no need to display notification
          setShowModal(false);
          setIsSubmitting(false);
          return;
        }
      } else {
        await axios.post(`${API_ENDPOINT_URL}/borrowers`, payload);
        toast.success('Borrower Added Successfully! 🎉', {
          position: "top-center",
          autoClose: 3000,
      })
      }
        
      setShowModal(false);
      setBorrowerName("");
      setItem("");
      setStatus("BORROWED");
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center ">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full mx-4 bg-gradient-to-r from-blue-800 to-blue-500">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <h2 className="font-semibold text-2xl mb-6 text-white">
              Borrow Form
            </h2>
            <button
              className="mb-10 hover:text-blue-400 text-white"
              onClick={() => setShowModal(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-white font-medium">
                Borrower&apos;s Name:
              </label>
              <input
                required
                type="text"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-white font-medium">
                Item/Equipment:
              </label>
              <input
                required
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {isEdit &&  
              <div>
                <label className="text-white font-medium">Status:</label>
                <select
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                >
                  <option value="BORROWED">BORROWED</option>
                  <option value="RETURNED">RETURNED</option>
                </select>
              </div> }
          </div>
          <div className="mt-6 flex justify-center">
            <button
              disabled={isSubmitting}
              type="submit"
              className=" font-semibold px-6 py-2 bg-white text-black rounded-lg hover:bg-blue-100 transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
