import { useEffect, useState } from 'react';

type ProgressBarProps = {
  labelText: string;
  value: number;
  setValue: any;
  min: number;
  max: number;
  step: number;
  unit?: string;
};

function SlideBar({ labelText, value, setValue, min, max, step, unit }: ProgressBarProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="grid w-full grid-cols-2 grid-rows-2">
      <label
        className="self-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor={labelText}
      >
        {labelText}
      </label>

      {/* current value */}
      <div className="flex items-center gap-[2px] justify-self-end text-sm text-zinc-500">
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(+e.target.value);
          }}
          onBlur={(e) => {
            const val = +e.target.value;
            if (val < min) {
              setValue(min);
              setInputValue(min);
            }
            if (val > max) {
              setValue(max);
              setInputValue(max);
            }

            if (val >= min && +val <= max) {
              setValue(val);
              setInputValue(val);
            }
          }}
          className="w-12 rounded-md px-1 py-0.5 text-right hover:outline hover:outline-1 hover:outline-zinc-300"
        />
        {unit && <p>{unit}</p>}
      </div>

      {/* slide bar */}
      <div
        className="relative col-span-2 flex w-full touch-none select-none items-center"
        id={labelText}
      >
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SlideBar;
