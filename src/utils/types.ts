import { type ReactNode } from 'react';

export type ListData<T> = {
  total: number;
  offset?: number;
  limit?: number;
  data: T[];
};

export type ColumnDef<T> = {
  head: string;
  displayFn: (t: T) => string | number | ReactNode | undefined;
  checkbox?: boolean;
};
