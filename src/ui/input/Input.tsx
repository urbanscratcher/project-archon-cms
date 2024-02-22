import { forwardRef, type ComponentPropsWithoutRef, useContext } from 'react';
import { DisplayContext } from '../../DisplayContext';

type InputProps = {
  borderless?: boolean;
  roundless?: boolean;
} & ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ borderless = false, roundless = false, ...otherProps }: InputProps, ref) => {
    const { darkMode } = useContext(DisplayContext);

    return (
      <input
        {...otherProps}
        ref={ref}
        className={`
          ${
            borderless ||
            'focus-visible:ring-ring border border-solid border-zinc-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 dark:border-zinc-700 dark:focus-visible:ring-offset-zinc-900'
          }
          ${darkMode && 'inputDarkMode'}
          ${roundless || 'rounded-lg'}
          w-full
          bg-transparent
          px-4
          py-2
          text-zinc-800
          disabled:pointer-events-none
          disabled:opacity-50
          dark:text-zinc-400
          dark:placeholder:text-zinc-700
        ${otherProps.className || ''}`}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
