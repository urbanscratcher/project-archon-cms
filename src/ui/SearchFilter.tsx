import { PropsWithChildren } from 'react';
import Button from './button/Button';
import InputAction from './input/InputAction';

function SearchFilter({
  onSetSearchFilter,
  searchFilter,
  placeholder,
}: {
  onSetSearchFilter: (str: string) => void;
  searchFilter: string | null | undefined;
  placeholder: string;
}) {
  return (
    <SearchFilter.Container>
      <InputAction
        placeholder={placeholder}
        setAction={onSetSearchFilter}
      />
      {searchFilter && (
        <SearchFilter.Reset
          onSetSearchFilter={onSetSearchFilter}
          searchFilter={searchFilter}
        />
      )}
    </SearchFilter.Container>
  );
}

SearchFilter.Container = function Container({ children }: PropsWithChildren) {
  return <div className="flex gap-4">{children}</div>;
};

SearchFilter.Reset = function SearchedReset({
  onSetSearchFilter,
  searchFilter,
}: {
  onSetSearchFilter: (str: string) => void;
  searchFilter: string;
}) {
  const resetHandler = () => {
    onSetSearchFilter('');
  };

  return (
    <div className="flex items-center gap-2">
      <q className="font-semibold">{searchFilter}</q>
      <Button
        size="sm"
        buttonType="borderless"
        className="h-[42px]"
        onClick={resetHandler}
      >
        <div className="flex items-center gap-1">
          <p>Reset</p>
          <span className="icon-[lucide--rotate-ccw]"></span>
        </div>
      </Button>
    </div>
  );
};

export default SearchFilter;
