import { useState, type PropsWithChildren, useEffect } from 'react';
import Button from './Button';

export type SortStatus = 'none' | 'desc' | 'asc';

type SortableBtnProps = {
  onSort: (sortStatus: SortStatus) => void;
  initialSortStatus: SortStatus;
};

function SortableBtn({ children, onSort, initialSortStatus }: PropsWithChildren & SortableBtnProps) {
  const [sortStatus, setSortState] = useState<SortStatus>(initialSortStatus);

  useEffect(() => {
    onSort(sortStatus);
  }, [sortStatus]);

  const clickHandler = () => {
    if (sortStatus === 'none') setSortState('desc');
    else if (sortStatus === 'desc') setSortState('asc');
    else setSortState('none');
  };

  return (
    <div className="w-fit">
      <Button
        buttonType="sort"
        onClick={clickHandler}
      >
        {children}
        {sortStatus === 'none' ? (
          <span className="icon-[lucide--arrow-up-down]"></span>
        ) : sortStatus === 'asc' ? (
          <span className="icon-[lucide--arrow-up]"></span>
        ) : (
          <span className="icon-[lucide--arrow-down]"></span>
        )}
      </Button>
    </div>
  );
}

export default SortableBtn;
