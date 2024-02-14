import { create } from 'zustand';

type CareersStore = {
  dragged: number;
  setDragged: (topicIdx: number) => void;
};

export const useCareersStore = create<CareersStore>((set) => ({
  dragged: -1,
  setDragged: (idx: number) => set({ dragged: idx }),
}));
