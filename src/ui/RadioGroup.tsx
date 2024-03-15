import { MouseEvent } from 'react';

type RadioGroupProps = {
  labelTexts: string[];
  selected: string;
  setSelected: any;
};

function RadioGroup({ labelTexts, selected, setSelected }: RadioGroupProps) {
  const clickHandler = (e: MouseEvent, labelText: string) => {
    e.preventDefault();
    setSelected(labelText);
  };

  return (
    <>
      <div
        role="radiogroup"
        aria-required="false"
        className="my-1 flex flex-col gap-2"
        tabIndex={0}
      >
        {labelTexts.map((labelText) => (
          <div
            className="x-3 flex items-center gap-2"
            key={labelText}
          >
            <button
              id={labelText}
              role="radio"
              aria-checked={selected === labelText ? true : false}
              data-state={selected === labelText ? 'checked' : 'unchecked'}
              tabIndex={selected === labelText ? 0 : -1}
              onClick={(e) => clickHandler(e, labelText)}
              className={`focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border border-zinc-800 shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                selected === labelText ? 'icon-[lucide--check-circle]' : 'icon-[lucide--circle]'
              }`}
            ></button>
            <input
              aria-hidden
              tabIndex={-1}
              type="radio"
              className="pointer-events-none absolute h-4 w-4 translate-x-[-100%] opacity-0"
              checked={selected === labelText}
              id={labelText}
              name={labelText}
              value={labelText}
              disabled={false}
              onChange={(e) => e.preventDefault()}
            />
            <label
              htmlFor={labelText}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed  peer-disabled:opacity-70"
            >
              {labelText}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default RadioGroup;
