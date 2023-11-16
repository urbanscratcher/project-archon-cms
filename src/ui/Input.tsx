import { ChangeEventHandler, ReactElement } from 'react';

interface InputProps {
  type: string;
  id: string;
  autoComplete: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
}

function Input({ type, id, autoComplete, value, onChange, disabled }: InputProps): ReactElement {
  return (
    <input
      type={type}
      id={id}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="rounded-md border border-solid border-ghost-300 bg-ghost-50 px-3 py-5 shadow-sm"
    />
  );
}

export default Input;
