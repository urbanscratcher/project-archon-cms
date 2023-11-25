import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type InputProps = ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="
      input:bg-white
        w-full
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
