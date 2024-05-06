import { create } from "zustand";

interface SeachBorrowerState {
  searchBorrower: string;
  setSearchBorrower: (value: string) => void;
}

const useBorrowerNameStore = create<SeachBorrowerState>((set) => ({
  searchBorrower: "",
  setSearchBorrower: (value) => set({ searchBorrower: value }),
}));

export default useBorrowerNameStore;
