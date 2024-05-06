import useStatusFilterStore from "@/stores/useFilterBorrowerStore";
import React from "react";


const DropdownFilter: React.FC = () => {

  const { filterBorrower, setFilterBorrower } = useStatusFilterStore();

  return (
    <select
      value={filterBorrower}
      onChange={(e) => setFilterBorrower(e.target.value)}
      className="bg-white border-blue-500 border-2 px-3 py-2 rounded-lg mr-3"
    >
      <option value="All">All</option>
      <option value="BORROWED">Borrowed</option>
      <option value="RETURNED">Returned</option>
    </select>
  );
};

export default DropdownFilter;