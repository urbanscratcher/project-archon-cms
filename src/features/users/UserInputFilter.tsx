import { useRef, useState, type ChangeEvent, type KeyboardEvent, useEffect } from 'react';
import Input from '../../ui/input/Input';

type UserFilterProps = {
  onSetFilter: (value: string) => void;
};
function UserInputFilter({ onSetFilter }: UserFilterProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [filterValue, setFilterValue] = useState('');
  const [prevFilterValues, setPrevFilterValues] = useState<string[]>([]);
  const filterHistoryPointer = useRef(0);

  useEffect(() => {
    const waitInput = setTimeout(() => filterValue && onSetFilter(filterValue), 500);
    return () => clearTimeout(waitInput);
  }, [filterValue]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const resetHandler = () => {
    setFilterValue('');
  };

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    // stable search
    if (e.key === 'Enter') {
      // pass value to table for re-render
      if (!filterValue) {
        onSetFilter('');
      }

      if (filterValue) {
        setPrevFilterValues((prev) => [...prev, filterValue]);
        filterHistoryPointer.current = prevFilterValues.length + 1;
        onSetFilter(filterValue);
      }
    }

    // history
    if (e.key === 'ArrowUp') {
      if (prevFilterValues.length > 0) {
        const curValue = ref.current!.value;

        if (!curValue) {
          filterHistoryPointer.current -= 1;
          setFilterValue(prevFilterValues[filterHistoryPointer.current]);
        }

        if (curValue) {
          filterHistoryPointer.current =
            filterHistoryPointer.current > 0 ? filterHistoryPointer.current - 1 : filterHistoryPointer.current;
          const prevValue = prevFilterValues[filterHistoryPointer.current];
          setFilterValue(prevValue);
        }
      }
    }

    if (e.key === 'ArrowDown') {
      if (prevFilterValues.length > 0) {
        const curValue = ref.current!.value;

        if (!curValue) {
          setFilterValue('');
        }

        if (curValue) {
          const nextPointer = filterHistoryPointer.current + 1;

          if (nextPointer < prevFilterValues.length) {
            filterHistoryPointer.current += 1;
            const prevValue = prevFilterValues[nextPointer];
            setFilterValue(prevValue);
          }

          if (nextPointer === prevFilterValues.length) {
            filterHistoryPointer.current = prevFilterValues.length;
            setFilterValue('');
          }
        }
      }
    }
  };

  return (
    <div className="w-[50%] min-w-fit max-w-[40rem]">
      <Input
        placeholder="Search a name or email..."
        onChange={changeHandler}
        onFocus={resetHandler}
        onKeyDown={searchHandler}
        value={filterValue}
        ref={ref}
      />
    </div>
  );
}

export default UserInputFilter;
