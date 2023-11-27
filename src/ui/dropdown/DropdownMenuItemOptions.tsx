import { type MouseEvent } from 'react';
import { DropdownMenuItem } from './DropdownMenuItem';

type MenuItemProp = {
  item: string;
  selected: boolean;
  onSelect: (menuItem: any) => void;
};

function DropdownOptions({ item, selected, onSelect }: MenuItemProp) {
  const clickHandler = (e: MouseEvent) => {
    // prevent refocusing
    e.preventDefault();
    onSelect({ item, selected: !selected });
  };

  return (
    <DropdownMenuItem onMouseDown={clickHandler}>
      {selected && (
        <span className="icon-[lucide--check] absolute left-0 top-[50%] z-20 translate-x-2 translate-y-[-50%] text-base"></span>
      )}
      {item}
    </DropdownMenuItem>
  );
}
export default DropdownOptions;
