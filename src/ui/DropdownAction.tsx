import useToggle from '../hooks/useToggle';
import { Dropdown } from './Dropdown';
import Button from './button/Button';

export type SelectOptions = {
  item: string;
  selected: boolean;
};

type DropdownActionProps = {
  options: string[];
  selectedOptions: string[];
  selectOption: (value: string) => void;
  unselectOption: (value: string) => void;
  buttonText: string;
  closedAfterSelect?: boolean;
};

function DropdownAction({
  options,
  selectedOptions,
  selectOption,
  unselectOption,
  buttonText,
  closedAfterSelect = false,
}: DropdownActionProps) {
  const [closed, toggle] = useToggle(true);

  const selectHandler = (o: string) => {
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
      </Button>
      {!closed && (
        <Dropdown.Content>
          {options.map((r) => (
            <Dropdown.CheckItem
              key={r}
              checked={selectedOptions.includes(r)}
              onCheckedChange={() => selectHandler(r)}
            >
              {r}
            </Dropdown.CheckItem>
          ))}
        </Dropdown.Content>
      )}
    </Dropdown>
  );
}

export default DropdownAction;
