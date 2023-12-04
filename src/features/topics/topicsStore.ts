import { create } from 'zustand';

type TopicsState = {
  dragged: number;
  setDragged: (topicIdx: number) => void;
};

export const useTopicsStore = create<TopicsState>((set) => ({
  dragged: -1,
  setDragged: (idx: number) => set({ dragged: idx }),
}));
