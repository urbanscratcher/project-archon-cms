import { useEffect, useState, type FocusEvent } from 'react';
import Button from '../../ui/button/Button';
import DropdownMenuBox from '../../ui/dropdown/DropdownMenuBox';
import DropdownMenuContainer from '../../ui/dropdown/DropdownMenuContainer';
import DropdownOptions from '../../ui/dropdown/DropdownMenuItemOptions';

type UserRoleFilterProps = {
  onSetFilterValue: (val: any) => void;
};

export type SelectOptions = {
  item: string;
  selected: boolean;
};

function UserRoleFilter({ onSetFilterValue }: UserRoleFilterProps) {
  const [closed, setClosed] = useState(true);
  const [options, setOptions] = useState<SelectOptions[]>([
    { item: 'user', selected: true },
    { item: 'admin', selected: true },
    { item: 'editor', selected: true },
    { item: 'writer', selected: true },
  ]);

  useEffect(() => {
    onSetFilterValue(options);
  }, [options]);

  const onSetMenuItem = (menuItem: SelectOptions) => {
    const newMenuItem = options.map((m) =>
      m.item === menuItem.item ? { item: m.item, selected: menuItem.selected } : m,
    );
    setOptions(newMenuItem);
  };

  const closeHandler = (e: FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setClosed(true);
    }
  };

  const toggleHandler = () => {
    setClosed((closed) => !closed);
  };

  return (
    <div
      className="relative"
      onBlur={closeHandler}
    >
      <Button
        size="sm"
        buttonType="dropdown"
        aria-expanded={!closed}
        onClick={toggleHandler}
      >
        Filter by Role
      </Button>
      {!closed && (
        <DropdownMenuContainer>
          <DropdownMenuBox>
            {options.map((m) => (
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

export default UserRoleFilter;
