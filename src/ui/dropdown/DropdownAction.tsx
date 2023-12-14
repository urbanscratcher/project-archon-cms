import { useState, type MouseEvent, type PropsWithChildren } from 'react';
import Dropdown from './Dropdown';
import Button from '../button/Button';

export type SelectOptions = {
  item: string;
  selected: boolean;
};

type StringOption<T> = T & {
  name?: never;
};
type ObjectWithNameOption<T> = T & {
  name?: string;
};
type DropdownOption<T> = StringOption<T> | ObjectWithNameOption<T>;

type DropdownActionProps<T> = {
  options: DropdownOption<T>[];
  selectedOptions: DropdownOption<T>[];
  onSelect: (value: DropdownOption<T>) => void;
  onUnselect: (value: DropdownOption<T>) => void;
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

  const selectHandler = (o: DropdownOption<T>) => {
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
          {options.map((o) => (
            <Dropdown.CheckItem
              key={typeof o === 'string' ? o : o.name}
              checked={selectedOptions.includes(o)}
              onCheckedChange={() => selectHandler(o)}
            >
              {typeof o === 'string' ? o : o.name}
            </Dropdown.CheckItem>
          ))}
        </Dropdown.Content>
      )}
    </Dropdown>
  );
}

export default DropdownAction;
