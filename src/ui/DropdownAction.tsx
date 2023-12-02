import { PropsWithChildren, ReactNode } from 'react';
import useToggle from '../hooks/useToggle';
import { Dropdown } from './Dropdown';
import Button from './button/Button';

export type SelectOptions = {
  item: string;
  selected: boolean;
};

type DropdownActionProps<T> = {
  options: T[];
  selectedOptions: T[];
  selectOption: (value: T) => void;
  unselectOption: (value: T) => void;
  buttonText?: string;
  closedAfterSelect?: boolean;
};

function DropdownAction<T>({
  options,
  selectedOptions,
  selectOption,
  unselectOption,
  buttonText,
  children,
  closedAfterSelect = false,
}: DropdownActionProps<T> & PropsWithChildren) {
  const [closed, toggle] = useToggle(true);

  const selectHandler = (o: T) => {
    selectedOptions.includes(o) ? unselectOption(o) : selectOption(o);
    closedAfterSelect && toggle(true);
  };

  return (
    <Dropdown onToggle={toggle}>
      <Button
        size="sm"
        buttonType="dropdown"
        aria-expanded={!closed}
        onClick={toggle}
      >
        {buttonText}
        {children}
      </Button>
      {!closed && (
        <Dropdown.Content>
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
