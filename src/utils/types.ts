import { type ReactNode } from 'react';

export type Dto = {
  idx: number;
};

export type ListData<T extends Dto> = {
  total: number;
  offset?: number;
  limit?: number;
  data: T[];
};

export type ColumnDef<T> = {
  type: 'data' | 'index' | 'menu' | 'checkbox';
  head: string;
  displayFn: (t: T) => string | number | ReactNode | undefined;
  checkbox?: boolean;
  widthPercent: number;
};
