"use client";

import React, { useState } from "react";
import BorrowersList from "./BorrowersList";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import DropdownFilter from "./DropDownFilter";

const BorrowersPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <div className="p-8 h-[100vh]">
      <div className="flex justify-between items-center px-[10%] py-4">
        
        <h2 className="text-xl ml-3 font-large text-Black font-bold">
          BORROWERS LIST
        </h2>

        <SearchBar />
        <div>
          <DropdownFilter />
          <button
            onClick={() => {
              setShowModal(true);
              setIsEdit(false);
            }}
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-3 rounded-lg"
          >
            + New Borrower
          </button>
        </div>
      </div>
      <BorrowersList isEdit={isEdit} setIsEdit={setIsEdit} />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        isEdit={isEdit}
        selectedBorrower={null}
      />
    </div>
  );
};

export default BorrowersPage;
