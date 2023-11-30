import { create } from 'zustand';

export type Topic = {
  idx: number;
  name: string;
  seq: number;
  totalInsights: number;
};

type TopicsState = {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
};

export const useUsersStore = create<TopicsState>((set) => ({
  topics: [],
  setTopics: (topics: Topic[]) => set({ topics }),
}));
