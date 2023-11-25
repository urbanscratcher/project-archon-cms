import { forwardRef, type ChangeEventHandler, type ComponentPropsWithoutRef } from 'react';

type InputProps = {
  type: string;
  id: string;
  autoComplete: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
} & ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
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
});

Input.displayName = 'Input';

export default Input;
