import { MouseEvent, PropsWithChildren, useState } from 'react';

type CheckBoxProps = {
  labelText: string;
  id: string;
  clicked: boolean;
  onClicked: (e: MouseEvent, checked: boolean) => void;
} & PropsWithChildren;

function CheckBox({ id, labelText, clicked, onClicked }: CheckBoxProps) {
  const [checked, setChecked] = useState(clicked);
  const clickHandler = (e: MouseEvent, checked: boolean) => {
    onClicked(e, !checked);
    setChecked(!checked);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        data-state={checked ? 'checked' : 'unchecked'}
        onClick={(e: MouseEvent) => clickHandler(e, checked)}
        className="peer h-4 w-4 rounded-[0.2rem] border border-zinc-700 data-[state=checked]:bg-zinc-800 data-[state=checked]:text-white"
        id={id}
      >
        {checked && <span className="icon-[lucide--check] flex text-current"></span>}
      </button>
      <label
        htmlFor={id}
        className="text-sm font-medium  leading-none"
      >
        {labelText}
      </label>
    </div>
  );
}

export default CheckBox;
