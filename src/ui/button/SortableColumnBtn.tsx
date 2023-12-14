import { useEffect, useState } from 'react';
import SortableBtn, { SortStatus } from './SortableBtn';
import { useUserFilterStore } from '../../features/users/usersStore';
import { ColumnDef } from '../../utils/types';

type SortableColumnBtnProps = {
  def: ColumnDef<any>;
};

function SortableColumnBtn({ def }: SortableColumnBtnProps) {
  const { sorts } = useUserFilterStore();
  const [sortStatus, setSortStatus] = useState<SortStatus>(() => {
    if (sorts?.includes(`${def.sortKey}`)) return 'asc';
    if (sorts?.includes(`-${def.sortKey}`)) return 'desc';
    return 'none';
  });

  const onSort = (sortStatus: SortStatus) => {
    setSortStatus(sortStatus);
  };

  const { addSorts, removeSorts } = useUserFilterStore();

  useEffect(() => {
    if (def?.sortKey) {
      switch (sortStatus) {
        case 'desc':
          removeSorts(`${def.sortKey}`);
          addSorts(`-${def.sortKey}`);
          break;
        case 'asc':
          removeSorts(`-${def.sortKey}`);
          addSorts(`${def.sortKey}`);
          break;
        case 'none':
          removeSorts(`-${def.sortKey}`);
          removeSorts(def.sortKey!);
          break;
      }
    }
  }, [sortStatus]);

  return (
    <SortableBtn
      onSort={onSort}
      initialSortStatus={sortStatus}
    >
      {def.head}
    </SortableBtn>
  );
}

export default SortableColumnBtn;
