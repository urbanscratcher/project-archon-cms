import { create } from 'zustand';

type UserFilterStore = {
  searchFilter?: string | null;
  setSearchfilter?: (inputFilter: string) => void;
  rolesFilter?: string | null;
  setRolesFilter?: (orFilter: string) => void;
  sorts?: string | null;
  setSorts?: (orFilter: string) => void;
  rowsPerPage?: string | null;
  setRowsPerPage?: (orFilter: string) => void;
  currentPage?: string | null;
  setCurrentPage?: (orFilter: string) => void;
};

export const useUserFilterStore = create<UserFilterStore>()((set) => ({
  searchFilter: '',
  setInputFilter: (inputFilter?: string) => set({ searchFilter: inputFilter }),
}));
