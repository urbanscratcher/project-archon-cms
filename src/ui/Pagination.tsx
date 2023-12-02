import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import DropdownAction from './DropdownAction';
import Button from './button/Button';

type PaginationProps = {
  onSetLimit: (value: number) => void;
  onSetOffset: (value: number) => void;
  limit: number;
  offset: number;
  total: number;
};

const rowsPerPageOptions = ['5', '10', '20', '30', '40', '50'];

function Pagination({ onSetLimit, onSetOffset, limit, offset, total }: PaginationProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([limit.toString()]);
  const lastPage = Math.ceil(total / limit);
  const curPage = Math.floor(offset / limit) + 1;

  const selectOption = useCallback(
    (option: string) => {
      selectedOptions[0] !== option && setSelectedOptions([option]);
    },
    [selectedOptions, setSelectedOptions],
  );

  const unselectOption = useCallback(
    (option: string) => {
      selectedOptions[0] !== option &&
        setSelectedOptions((selectedOptions) => selectedOptions.filter((o) => o !== option));
    },
    [selectedOptions, setSelectedOptions],
  );

  useEffect(() => {
    if (selectedOptions[0]) {
      onSetLimit(parseInt(selectedOptions[0]));
      onSetOffset(0);
    }
  }, [selectedOptions, onSetLimit, onSetOffset]);

  const clickPrevHandler = useCallback(() => {
    if (offset <= 0) return;
    onSetOffset(offset - limit);
  }, [offset, limit, onSetOffset]);

  const clickNextHandler = useCallback(() => {
    if (offset + limit >= total) return;
    onSetOffset(offset + limit);
  }, [offset, limit, total, onSetOffset]);

  return (
    <Pagination.Content>
      <Pagination.ControlBox>
        <Pagination.Label>Rows per page</Pagination.Label>
        <DropdownAction
          buttonText={selectedOptions[0]}
          options={rowsPerPageOptions}
          selectedOptions={selectedOptions}
          selectOption={selectOption}
          unselectOption={unselectOption}
          closedAfterSelect={true}
        />
      </Pagination.ControlBox>
      <Pagination.ControlBox>
        <Pagination.Label>
          Page {curPage} of {lastPage}
        </Pagination.Label>
        <Pagination.Controller>
          <Button
            buttonType="muted"
            size="icon"
            disabled={offset <= 0}
            onClick={clickPrevHandler}
          >
            <span className="icon-[lucide--chevron-left]"></span>
          </Button>
          <Button
            buttonType="muted"
            size="icon"
            disabled={offset + limit >= total}
            onClick={clickNextHandler}
          >
            <span className="icon-[lucide--chevron-right]"></span>
          </Button>
        </Pagination.Controller>
      </Pagination.ControlBox>
    </Pagination.Content>
  );
}

Pagination.Label = function Label({ children }: PropsWithChildren) {
  return <p>{children}</p>;
};

Pagination.Controller = function Controller({ children }: PropsWithChildren) {
  return <div className="flex gap-1">{children}</div>;
};

Pagination.Content = function Content({ children }: PropsWithChildren) {
  return <div className="flex items-center justify-end gap-8">{children}</div>;
};

Pagination.ControlBox = function ControlBox({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-2">{children}</div>;
};

export default Pagination;
