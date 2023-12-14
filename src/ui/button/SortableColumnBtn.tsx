import { useEffect, useState } from 'react';
import { ColumnDef } from '../../utils/types';
import SortableBtn, { SortStatus } from './SortableBtn';

type SortableColumnBtnProps = {
  def: ColumnDef<any>;
  onAddSorts: (sorts: string) => void;
  onRemoveSorts: (sorts: string) => void;
  sorts: string[];
};

function SortableColumnBtn({ def, onAddSorts, onRemoveSorts, sorts }: SortableColumnBtnProps) {
  const [sortOrder, setSortOrder] = useState<SortStatus>(() => {
    if (sorts?.includes(`${def.sortKey}`)) return 'asc';
    if (sorts?.includes(`-${def.sortKey}`)) return 'desc';
    return 'none';
  });

  const onSort = (sortStatus: SortStatus) => setSortOrder(sortStatus);

  useEffect(() => {
    if (def?.sortKey) {
      switch (sortOrder) {
        case 'desc':
          onAddSorts(`-${def.sortKey}`);
          onRemoveSorts(`${def.sortKey}`);
          break;
        case 'asc':
          onAddSorts(`${def.sortKey}`);
          onRemoveSorts(`-${def.sortKey}`);
          break;
        case 'none':
          onAddSorts(`-idx`);
          onRemoveSorts(def.sortKey);
          break;
      }
    }
  }, [sortOrder]);

  return (
    <SortableBtn
      onSort={onSort}
      initialSortStatus={sortOrder}
    >
      {def.head}
    </SortableBtn>
  );
}

export default SortableColumnBtn;
