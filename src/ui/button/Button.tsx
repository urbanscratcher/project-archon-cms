import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';

type ButtonProps = {
  size?: 'sm' | 'md' | 'icon';
  buttonType?: 'primary' | 'dropdown' | 'borderless' | 'muted' | 'sort';
  buttonFunction?: 'delete';
  disabled?: boolean;
  children?: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, buttonType, disabled = false, buttonFunction, children, className, ...props }, ref) => {
    const getSize = (size: string): string => {
      switch (size) {
        case 'icon':
          return 'px-1 py-2 text-md rounded-md flex justify-center items-center';
        case 'sm':
          return 'px-4 py-2 text-md rounded-md';
        case 'md':
          return 'px-5 py-3 text-md rounded-lg';
        default:
          return '';
      }
    };

    const getType = (type: string): string => {
      switch (type) {
        case 'primary':
          return 'bg-navy-700 text-navy-50 hover:bg-navy-600 border-none  shadow-sm font-normal';
        case 'dropdown':
          return 'border border-zinc-300 bg-white hover:bg-zinc-50 flex items-center justify-between active:bg-zinc-100 gap-1 shadow-sm font-normal min-w-[6rem]';
        case 'borderless':
          return 'flex rounded-md  hover:bg-zinc-100 active:bg-zinc-200/50 items-center justify-center font-normal';
        case 'muted':
          return 'border border-zinc-300 rounded-md hover:bg-zinc-100 active:bg-zinc-200/50 shadow-sm font-normal';
        case 'sort':
          return 'flex rounded-md  hover:bg-zinc-200 active:bg-zinc-300/80 items-center justify-center px-3 py-1 rounded-md gap-1 font-medium';
        default:
          return '';
      }
    };

    return (
      <button
        ref={ref}
        {...props}
        className={
          `
          w-full
          whitespace-nowrap
          text-center
          capitalize
          transition-colors
          disabled:pointer-events-none
          disabled:opacity-50 
        ${size && getSize(size)} ${buttonType && getType(buttonType)}
      ` + className
        }
        disabled={disabled}
      >
        {children && children}
        {buttonType === 'dropdown' && <span className="icon-[lucide--chevron-down]"></span>}
        {buttonFunction === 'delete' && <span className="icon-[lucide--trash-2] m-2 text-zinc-600"></span>}
      </button>
    );
  },
);

export default Button;
