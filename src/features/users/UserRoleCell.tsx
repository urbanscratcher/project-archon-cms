import { useState, type FocusEvent } from 'react';
import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
import DropdownMenuBox from '../../ui/dropdown/DropdownMenuBox';
import DropdownMenuContainer from '../../ui/dropdown/DropdownMenuContainer';
import DropdownOptions from '../../ui/dropdown/DropdownMenuItemOptions';
import { SelectOptions } from './UserRoleFilter';
import useUpdateUsers from './useUpdateUsers';

type UserRoleCellProps = {
  userRole: any;
  options: string[];
};
function UserRoleCell({ userRole, options }: UserRoleCellProps) {
  const [closed, setClosed] = useState(true);
  const [menuItems, setMenuItems] = useState<SelectOptions[]>(
    options.map((o) => ({ item: o, selected: o === userRole })),
  );

  // update data
  const { mutate, isPending, error } = useUpdateUsers({ role: userRole });

  if (isPending) return <Spinner />;
  if (error) return <Error>{error.message}</Error>;

  const onSetMenuItem = (menuItem: SelectOptions) => {
    // current item is not be updated
    if (menuItem.item === userRole) return;

    // get confirm
    const sure = confirm('are you sure to update?');
    if (!sure) return;

    // update data
    mutate({ role: menuItem.item });

    // update ui
    const newMenuItem = menuItems.map((i) => {
      i.selected = i.item === menuItem.item;
      return i;
    });
    setMenuItems(newMenuItem);
  };

  const closeHandler = (e: FocusEvent) => {
    setClosed(true);
  };

  const toggleHandler = () => {
    setClosed((closed) => !closed);
  };

  return (
    <div
      onBlur={closeHandler}
      className="relative"
    >
      <Button
        size="sm"
        buttonType="dropdown"
        aria-expanded={!closed}
        onClick={toggleHandler}
      >
        {userRole}
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
  );
}

export default UserRoleCell;
