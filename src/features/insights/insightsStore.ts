import { create } from 'zustand';
import { Topic } from '../../models/Topic';

type InsightsFilterStore = {
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
  total: number;
  setTotal: (total: number) => void;
  topicOptions: Topic[];
  selectedTopic: Topic | null;
  selectTopic: (topic: Topic) => void;
  unselectTopic: (topic: Topic) => void;
};

export const useInsightsFilterStore = create<InsightsFilterStore>()((set) => ({
  sorts: [],
  addSorts: (s) =>
    set((state) => {
      if (state.sorts.includes(s)) {
        return { sorts: state.sorts };
      }
      return { sorts: [...state.sorts, s] };
    }),
  removeSorts: (s) => set((state) => ({ sorts: state.sorts.filter((sort) => sort !== s) })),
  searchFilter: null,
  setSearchFilter: (s) => set({ searchFilter: s }),
  limit: 10,
  setLimit: (l) => set({ limit: l }),
  offset: 0,
  setOffset: (o) => set({ offset: o }),
  total: 1,
  setTotal: (t) => set({ total: t }),
  topicOptions: [],
  selectedTopic: null,
  selectTopic: (topic) => set({ selectedTopic: topic }),
  unselectTopic: () => set({ selectedTopic: null }),
}));
