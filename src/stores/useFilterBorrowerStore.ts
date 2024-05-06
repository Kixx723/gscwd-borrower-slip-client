import { create } from "zustand";

interface FilterBorrowerState {
  filterBorrower: string;
  setFilterBorrower: (value: string) => void;
}

const useStatusFilterStore = create<FilterBorrowerState>((set) => ({
  filterBorrower: "All",
  setFilterBorrower: (value) => set({ filterBorrower: value }),
}));

export default useStatusFilterStore;
