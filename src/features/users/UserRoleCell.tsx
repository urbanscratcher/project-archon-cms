import { useState, type FocusEvent, useEffect } from 'react';
import AlertDialog from '../../ui/dialog/AlertDialog';
import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
import DropdownMenuBox from '../../ui/dropdown/DropdownMenuBox';
import DropdownMenuContainer from '../../ui/dropdown/DropdownMenuContainer';
import DropdownOptions from '../../ui/dropdown/DropdownMenuItemOptions';
import { SelectOptions } from './UserRoleFilter';
import useUpdateRole from './useUpdateRole';
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
  const { mutate, isPending, error } = useUpdateRole({ role: userRole });

  if (error) return <Error>{error.message}</Error>;

  const onContinue = (menuItem: SelectOptions) => {
    // update data
    mutate({ idx: idx, body: { role: menuItem.item } });
    queryClient.invalidateQueries({ queryKey: ['users'] });

    // update ui
    const newMenuItem = menuItems.map((i) => {
      i.selected = i.item === menuItem.item;
      return i;
    });
    setMenuItems(newMenuItem);

    // close alert dialog
    setClosed(true);
    setAlert(false);
  };

  const onCancel = () => {
    // close alert dialog
    setClosed(true);
    setAlert(false);
  };

  const onSetMenuItem = (selectedItem: SelectOptions) => {
    if (selectedItem.item === menuItems.filter((m) => m.selected === true)[0].item) return;
    setSelectItem(selectedItem);

    setAlert(!alert);
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
        {isPending ? <Spinner withText={false} /> : menuItems.filter((m) => m.selected === true)[0].item}
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
