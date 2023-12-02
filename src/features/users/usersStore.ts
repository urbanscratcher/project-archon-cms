import { create } from 'zustand';
import { Role } from '../../models/Users';

type UserFilterStore = {
  searchFilter?: string | null;
  setSearchFilter: (input: string) => void;
  sorts: string[];
  addSorts: (target: string) => void;
  removeSorts: (target: string) => void;
  limit: number;
  setLimit: (limit: number) => void;
  offset: number;
  setOffset: (offset: number) => void;
  getTotalPage?: () => void;
  roleOptions: Role[];
  selectedRoles: Role[];
  selectRole: (role: Role) => void;
  unselectRole: (role: Role) => void;
  total: number;
  setTotal: (total: number) => void;
};

export const useUserFilterStore = create<UserFilterStore>()((set) => ({
  selectRole: (role: Role) =>
    set((state) => ({
      selectedRoles: [...state.selectedRoles, role],
    })),
  unselectRole: (role: Role) => set((state) => ({ selectedRoles: state.selectedRoles.filter((r) => r !== role) })),
  sorts: [],
  addSorts: (s) =>
    set((state) => {
      if (state.sorts.includes(s)) {
        return { sorts: state.sorts };
      }
      return { sorts: [...state.sorts, s] };
    }),
  removeSorts: (s) => set((state) => ({ sorts: state.sorts.filter((sort) => sort !== s) })),
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
}));
