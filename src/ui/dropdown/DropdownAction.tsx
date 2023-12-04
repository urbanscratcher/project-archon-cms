import { useEffect, useState, type MouseEvent, type PropsWithChildren } from 'react';
import Dropdown from './Dropdown';
import Button from '../button/Button';

export type SelectOptions = {
  item: string;
  selected: boolean;
};

type DropdownActionProps<T> = {
  options: T[];
  selectedOptions: T[];
  onSelect: (value: T) => void;
  onUnselect: (value: T) => void;
  buttonText?: string;
  closedAfterSelect?: boolean;
};

function DropdownAction<T>({
  options,
  selectedOptions,
  onSelect,
  onUnselect,
  buttonText,
  children,
  closedAfterSelect = false,
}: DropdownActionProps<T> & PropsWithChildren) {
  const [closed, setClosed] = useState(true);
  const [showDown, setShowDown] = useState(true);

  const selectHandler = (o: T) => {
    selectedOptions.includes(o) ? onUnselect(o) : onSelect(o);
    closedAfterSelect && setClosed(true);
  };

  const clickHandler = (e: MouseEvent) => {
    const loc = e.currentTarget.getBoundingClientRect();
    if (window.innerHeight * 0.7 < loc.top) {
      setShowDown(false);
    }

    setClosed(!closed);
  };

  return (
    <Dropdown onToggle={setClosed}>
      <Button
        size="sm"
        buttonType="dropdown"
        aria-expanded={!closed}
        onClick={clickHandler}
      >
        {buttonText}
        {children}
      </Button>
      {!closed && (
        <Dropdown.Content showDown={showDown}>
          {options.map((r) => (
            <Dropdown.CheckItem
              key={r as string}
              checked={selectedOptions.includes(r)}
              onCheckedChange={() => selectHandler(r)}
            >
              {r as string}
            </Dropdown.CheckItem>
          ))}
        </Dropdown.Content>
      )}
    </Dropdown>
  );
}

export default DropdownAction;
