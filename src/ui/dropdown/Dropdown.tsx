import {
  useRef,
  type ComponentPropsWithoutRef,
  type FocusEvent,
  type MouseEvent,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

type DropdownProps = {
  children: ReactNode;
  onToggle: any;
};

function Dropdown({ children, onToggle }: DropdownProps) {
  const closeHandler = (e: FocusEvent) => {
    onToggle(!e.currentTarget.contains(e.relatedTarget));
  };

  return (
    <div
      className="relative"
      onBlur={closeHandler}
    >
      {children}
    </div>
  );
}

Dropdown.Content = function Content({ children, showDown }: PropsWithChildren & { showDown: boolean }) {
  const boxRef = useRef(null);
  const style = showDown ? 'left-0 top-full translate-y-1' : 'left-0 top-0 -translate-y-[calc(100%+0.25rem)]';

  return (
    <div
      className={'absolute z-10 min-w-max' + style}
      ref={boxRef}
    >
      <ul
        role="menu"
        className="min-w-[8rem] overflow-hidden rounded-sm border border-zinc-300 bg-white p-1 text-sm shadow-md"
      >
        {children}
      </ul>
    </div>
  );
};

Dropdown.CheckItem = function CheckItem({
  children,
  onCheckedChange,
  checked,
}: PropsWithChildren & { checked: boolean; onCheckedChange: () => void }) {
  return (
    <Dropdown.Item onMouseDown={onCheckedChange}>
      {checked && (
        <span className="icon-[lucide--check] absolute left-0 top-[50%] z-20 translate-x-2 translate-y-[-50%] text-base"></span>
      )}
      {children}
    </Dropdown.Item>
  );
};

Dropdown.Item = function Item({
  children,
  onMouseDown,
  ...props
}: ComponentPropsWithoutRef<'li'> & { onMouseDown: () => void }) {
  const clickHandler = (e: MouseEvent) => {
    e.preventDefault();
    onMouseDown();
  };

  return (
    <li
      {...props}
      onMouseDown={clickHandler}
      role="menuitem"
      className="relative cursor-default select-none items-center py-1.5 pl-8 pr-2 capitalize transition-colors hover:bg-zinc-100 focus:bg-zinc-100"
    >
      {children}
    </li>
  );
};

export default Dropdown;
