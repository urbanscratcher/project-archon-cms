import { type ReactNode } from 'react';

export type ColumnDef<T> = {
  type: 'data' | 'index' | 'menu' | 'checkbox';
  head: string;
  displayFn: (t: T) => string | number | ReactNode | undefined;
  checkbox?: boolean;
  sortKey?: string;
  style?: string;
};
