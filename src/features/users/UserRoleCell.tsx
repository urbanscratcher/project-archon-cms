import { useState, type FocusEvent, useEffect } from 'react';
import AlertDialog from '../../ui/AlertDialog';
import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
import DropdownMenuBox from '../../ui/dropdown/DropdownMenuBox';
import DropdownMenuContainer from '../../ui/dropdown/DropdownMenuContainer';
import DropdownOptions from '../../ui/dropdown/DropdownMenuItemOptions';
import { SelectOptions } from './UserRoleFilter';
import useUpdateUsers from './useUpdateUsers';
import useUsers from './useUsers';
import { useQueryClient } from '@tanstack/react-query';

type UserRoleCellProps = {
  idx: number;
  userRole: any;
  options: string[];
};
function UserRoleCell({ idx, userRole, options }: UserRoleCellProps) {
  const [closed, setClosed] = useState(true);
  const [menuItems, setMenuItems] = useState<SelectOptions[]>(
    options.map((o) => ({ item: o, selected: o === userRole })),
  );
  const [alert, setAlert] = useState(false);
  const [selectItem, setSelectItem] = useState<SelectOptions>({ item: userRole, selected: false });
  const queryClient = useQueryClient();

  // update data
  const { mutate, isPending, error } = useUpdateUsers({ role: userRole });

  // TODO: get one user after updating

  if (error) return <Error>{error.message}</Error>;

  const onContinue = (menuItem: SelectOptions) => {
    // update data
    mutate({ idx: idx, body: { role: menuItem.item } });

    // update ui
    const newMenuItem = menuItems.map((i) => {
      i.selected = i.item === menuItem.item;
      return i;
    });

    // TODO: get one user after updating

    const prev = queryClient.getQueryData(['users']);
    console.log(prev);
    // queryClient.setQueryData(['user'], { ...prev, data: { ...prev.data, role: menuItem.item } });

    setMenuItems(newMenuItem);

    setClosed(true);
    setAlert(false);
  };

  const onCancel = () => {
    setClosed(true);
    setAlert(false);
  };

  const onSetMenuItem = (menuItem: SelectOptions) => {
    // current item is not be updated
    if (menuItem.item === userRole) return;
    setAlert(!alert);
    setSelectItem(menuItem);
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
      {alert ? (
        <AlertDialog
          title={'Are you sure to update?'}
          description={'It changes your data'}
          onContinue={() => onContinue(selectItem)}
          onCancel={onCancel}
        />
      ) : null}
      <Button
        size="sm"
        buttonType="dropdown"
        aria-expanded={!closed}
        onClick={toggleHandler}
      >
        {isPending ? <Spinner withText={false} /> : selectItem.item}
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
