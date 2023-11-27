import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';

type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  buttonType?: 'primary' | 'dropdown' | 'borderless' | 'muted';
  buttonFunction?: 'delete' | 'hamburger-vertical' | 'send';
  disabled?: boolean;
  children?: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, buttonType, disabled = false, buttonFunction, children, ...props }, ref) => {
    const getSize = (size: string): string => {
      switch (size) {
        case 'sm':
          return 'px-4 py-2 text-sm rounded-md';
        case 'md':
          return 'px-3 py-3 text-md rounded-lg';
        case 'lg':
          return 'px-5 py-10 text-lg rounded-lg';
        default:
          return '';
      }
    };
    const getType = (type: string): string => {
      switch (type) {
        case 'primary':
          return 'bg-navy-700 text-navy-50 hover:bg-navy-600 border-none  shadow-sm';
        case 'dropdown':
          return 'border border-zinc-300 bg-white hover:bg-zinc-50 inline-flex items-center justify-center font-medium active:bg-zinc-100 h-10 gap-1  shadow-sm';
        case 'borderless':
          return 'ml-auto mr-0 flex rounded-md transition-colors hover:bg-zinc-100 active:bg-zinc-200/50';
        case 'muted':
          return 'border border-zinc-300 rounded-md transition-colors hover:bg-zinc-100 active:bg-zinc-200/50';
        default:
          return '';
      }
    };

    return (
      <button
        ref={ref}
        {...props}
        className={`
        whitespace-nowrap
        text-center
        font-normal
        capitalize
        disabled:pointer-events-none        
        disabled:opacity-50 
        ${size && getSize(size)} ${buttonType && getType(buttonType)}
      `}
        disabled={disabled}
      >
        {children && children}
        {buttonType === 'dropdown' && <span className="icon-[lucide--chevron-down]"></span>}
        {buttonFunction === 'hamburger-vertical' && (
          <span className="icon-[lucide--more-vertical] m-2 text-zinc-600"></span>
        )}
        {buttonFunction === 'delete' && <span className="icon-[lucide--trash-2] m-2 text-zinc-600"></span>}
        {buttonFunction === 'send' && <span className="icon-[lucide--send] m-2 text-zinc-600"></span>}
      </button>
    );
  },
);

export default Button;
