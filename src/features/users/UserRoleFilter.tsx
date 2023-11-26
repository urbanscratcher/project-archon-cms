import { useEffect, useRef, useState, type ReactNode } from 'react';
import Button from '../../ui/button/Button';

type MenuContainerProps = {
  children: ReactNode;
};
export function MenuContainer({ children }: MenuContainerProps) {
  return <div className="absolute z-10 min-w-max translate-y-1">{children}</div>;
}

type MenuBoxProps = {
  children: ReactNode;
};
export function MenuBox({ children }: MenuBoxProps) {
  return (
    <ul
      role="menu"
      className="min-w-[8rem] overflow-hidden rounded-sm border border-zinc-300 bg-white p-1 text-sm shadow-md"
    >
      {children}
    </ul>
  );
}

type MenuItemProp = {
  item: string;
  selected: boolean;
  onSetMenuItem: (menuItem: any) => void;
};

export function CheckMenuItem({ item, selected, onSetMenuItem }: MenuItemProp) {
  const [select, setSelect] = useState(selected);

  const clickHandler = (e) => {
    // prevent refocusing
    e.preventDefault();

    setSelect((select) => !select);
    onSetMenuItem({ item, selected: !select });
  };

  return (
    <li
      onMouseDown={clickHandler}
      role="menuitem"
      className="relative cursor-default select-none items-center py-1.5 pl-8 pr-2 capitalize transition-colors hover:bg-zinc-100 focus:bg-zinc-100"
    >
      {select && (
        <span className="icon-[lucide--check] absolute left-0 top-[50%] z-20 translate-x-2 translate-y-[-50%] text-base"></span>
      )}
      {item}
    </li>
  );
}

type UserRoleFilterProps = {
  onSetFilterValue: (val: any) => void;
};

function UserRoleFilter({ onSetFilterValue }: UserRoleFilterProps) {
  const [closed, setClosed] = useState(true);
  const [menuItems, setMenuItems] = useState([
    { item: 'user', selected: true },
    { item: 'admin', selected: true },
    { item: 'editor', selected: true },
    { item: 'writer', selected: true },
  ]);
  const comboBox = useRef(null);

  useEffect(() => {
    onSetFilterValue(menuItems);
  }, [menuItems]);

  const onSetMenuItem = (menuItem: any) => {
    const newMenuItem = menuItems.map((m) =>
      m.item === menuItem.item ? { item: m.item, selected: menuItem.selected } : m,
    );
    setMenuItems(newMenuItem);
  };

  const toggleHandler = (e) => {
    setClosed((closed) => !closed);
  };

  const handleCloseDropdown = (e) => {
    console.log('blurring............');
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setClosed(true);
    }
  };

  return (
    <div
      className="relative"
      ref={comboBox}
      onBlur={handleCloseDropdown}
    >
      <Button
        data-status={closed}
        size="sm"
        buttonType="dropdown"
        onClick={toggleHandler}
      >
        Filter by Role
      </Button>
      {!closed && (
        <MenuContainer>
          <MenuBox>
            {menuItems.map((m) => (
              <CheckMenuItem
                key={m.item}
                item={m.item}
                selected={m.selected}
                onSetMenuItem={onSetMenuItem}
              />
            ))}
          </MenuBox>
        </MenuContainer>
      )}
    </div>
  );
}

export default UserRoleFilter;
