import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type InputProps = ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>((otherProps, ref) => {
  return (
    <input
      {...otherProps}
      ref={ref}
      className={`
          w-full
          rounded-lg
          border
          border-solid
          border-zinc-300        
          px-4
          py-2        
          shadow-sm          
          disabled:pointer-events-none
          disabled:bg-zinc-100
        ${otherProps.className ?? ''}`}
    />
  );
});

Input.displayName = 'Input';

export default Input;
