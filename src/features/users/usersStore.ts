import { create } from 'zustand';

type UserFilterStore = {
  searchFilter?: string | null;
  setSearchFilter: (input: string) => void;
  rolesFilter?: string | null;
  setRolesFilter?: (orFilter: string) => void;
  sorts?: string | null;
  setSorts?: (orFilter: string) => void;
  rowsPerPage?: string | null;
  setRowsPerPage?: (orFilter: string) => void;
  currentPage?: string | null;
  setCurrentPage?: (orFilter: string) => void;
  getTotalPage?: () => void;
};

export const useUserFilterStore = create<UserFilterStore>()((set) => ({
  searchFilter: null,
  setSearchFilter: (input) => set({ searchFilter: input }),
}));
