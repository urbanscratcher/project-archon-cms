import { ChangeEventHandler, ReactElement } from 'react';

type InputProps = {
  type: string;
  id: string;
  autoComplete: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
};

function Input({ type, id, autoComplete, value, onChange, disabled }: InputProps): ReactElement {
  return (
    <input
      type={type}
      id={id}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="
        input:bg-white
        rounded-lg
        border
        border-solid
        border-zinc-300
        px-4
        py-2
        shadow-sm"
    />
  );
}

export default Input;
