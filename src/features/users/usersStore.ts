import { create } from 'zustand';

type UserFilterStore = {
  searchFilter?: string | null;
  setSearchFilter: (input: string) => void;
  sorts?: string | null;
  setSorts?: (orFilter: string) => void;
  limit: number;
  setLimit: (limit: number) => void;
  offset: number;
  setOffset: (offset: number) => void;
  getTotalPage?: () => void;
  roleOptions: string[];
  selectedRoles: string[];
  selectRole: (role: string) => void;
  unselectRole: (role: string) => void;
  total: number;
  setTotal: (total: number) => void;
  userSet: any[];
  setUserSet: (users: any[]) => void;
};

export const useUserFilterStore = create<UserFilterStore>()((set) => ({
  selectRole: (role) =>
    set((state) => ({
      selectedRoles: [...state.selectedRoles, role],
    })),
  unselectRole: (role) => set((state) => ({ selectedRoles: state.selectedRoles.filter((r) => r !== role) })),
  selectedRoles: ['user', 'admin', 'editor', 'writer'],
  roleOptions: ['user', 'admin', 'editor', 'writer'],
  searchFilter: null,
  setSearchFilter: (s) => set({ searchFilter: s }),
  limit: 10,
  setLimit: (l) => set({ limit: l }),
  offset: 0,
  setOffset: (o) => set({ offset: o }),
  total: 1,
  setTotal: (t) => set({ total: t }),
  userSet: [],
  setUserSet: (u) => set({ userSet: u }),
}));
