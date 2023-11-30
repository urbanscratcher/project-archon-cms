import { FocusEvent, useState } from 'react';
import { SelectOptions } from '../features/users/UserRoleFilter';
import Button from './button/Button';
import DropdownMenuBox from './dropdown/DropdownMenuBox';
import DropdownMenuContainer from './dropdown/DropdownMenuContainer';
import DropdownOptions from './dropdown/DropdownMenuItemOptions';

type PaginationProps = {
  offset: number;
  limit: number;
  total: number;
  onSetLimit: (value: number) => void;
  onSetOffset: (value: number) => void;
};

function Pagination({ offset, limit, total, onSetLimit, onSetOffset }: PaginationProps) {
  const options = ['5', '10', '20', '30', '40', '50'];

  const [closed, setClosed] = useState(true);
  const [menuItems, setMenuItems] = useState<SelectOptions[]>(
    options.map((o) => ({ item: o, selected: o === `${limit}` })),
  );
  const [curPage, setCurPage] = useState(1);

  const onSetMenuItem = (menuItem: SelectOptions) => {
    // current item is not be updated
    if (menuItem.item === `${limit}`) {
      setClosed(true);
      return;
    }

    // update data
    onSetLimit(Number(menuItem.item));

    // update ui
    const newMenuItem = menuItems.map((i) => {
      i.selected = i.item === menuItem.item;
      return i;
    });

    setMenuItems(newMenuItem);
    setClosed(true);
  };

  const closeHandler = (e: FocusEvent) => {
    setClosed(true);
  };

  const toggleHandler = () => {
    setClosed((closed) => !closed);
  };

  const clickPrevHandler = () => {
    const prevPage = curPage - 1;
    if (prevPage <= 0) return;

    setCurPage((curPage) => curPage - 1);
    onSetOffset((prevPage - 1) * limit);
  };

  const clickNextHandler = () => {
    const nextPage = curPage + 1;
    if (nextPage > Math.ceil(total / limit)) return;

    setCurPage((curPage) => curPage + 1);
    onSetOffset(curPage * limit);
  };

  return (
    <div className="flex items-center justify-end gap-8">
      <div className="flex items-center gap-2">
        <p>Rows per page</p>
        <div
          onBlur={closeHandler}
          className="relative"
        >
          <Button
            size="sm"
            buttonType="dropdown"
            aria-expanded={!closed}
            onClick={toggleHandler}
            id={'btn-users-rows-per-page'}
          >
            {limit}
          </Button>
          {!closed && (
            <DropdownMenuContainer>
              <DropdownMenuBox>
                {menuItems.map((m) => (
                  <DropdownOptions
                    key={m.item}
                    item={m.item}
                    selected={m.selected}
                    onSelect={onSetMenuItem}
                  />
                ))}
              </DropdownMenuBox>
            </DropdownMenuContainer>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>
          Page {curPage} of {Math.ceil(total / limit)}
        </p>
        <div className="flex gap-1">
          <Button
            buttonType="muted-icon"
            disabled={curPage - 1 <= 0}
            onClick={clickPrevHandler}
          >
            <span className="icon-[lucide--chevron-left]"></span>
          </Button>
          <Button
            buttonType="muted-icon"
            disabled={curPage + 1 > Math.ceil(total / limit)}
            onClick={clickNextHandler}
          >
            <span className="icon-[lucide--chevron-right]"></span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
