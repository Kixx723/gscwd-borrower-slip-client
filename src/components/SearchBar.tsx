import useBorrowerNameStore from "@/stores/useSearchBorrowerStore";
import React from "react";

const SearchBar = () => {
  const { searchBorrower, setSearchBorrower } = useBorrowerNameStore()

  return (
    <div className="relative flex items-center justify-end">
      <input
        type="text"
        placeholder="Search by name or item"
        value={searchBorrower}
        onChange={(e) => setSearchBorrower(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        className="absolute top-3 right-3 w-5 h-5 text-gray-400 pointer-events-none"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor" 
      >
        <path d="M11 17l4 4m0 0l4-4m-4 4V3"></path>
      </svg>
    </div>
  );
};

export default SearchBar;

// const [searchTerm, setSearchTerm] = useState<string>("");
// const [filteredBorrowers, setFilteredBorrowers] = useState<Borrower[]>([]);

// useEffect(() => {
//     // Filter borrowers based on search term
//     const filtered = borrowers.filter(borrower =>
//       borrower.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBorrowers(filtered);
//     // Reset current page when search term changes
//     setCurrentPage(1);
//   }, [borrowers, searchTerm]);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const searchBorrowerByName = (name: string) => {
//     setSearchTerm(name);
//   };

// <div className="relative flex items-center justify-end mb-4">
//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <svg
//             className="absolute top-3 right-3 w-5 h-5 text-gray-400 pointer-events-none"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path d="M11 17l4 4m0 0l4-4m-4 4V3"></path>
//           </svg>
//         </div>
