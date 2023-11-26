import { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  buttonType?: 'primary' | 'dropdown';
  disabled?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

// ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2

function Button({ size = 'md', buttonType = 'primary', disabled = false, children, ...props }: ButtonProps) {
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
        return 'bg-navy-700 text-navy-50 hover:bg-navy-600 border-none';
      case 'dropdown':
        return 'border border-zinc-300 bg-white hover:bg-zinc-50 inline-flex items-center justify-center font-medium active:bg-zinc-100 h-10 gap-1';
      default:
        return '';
    }
  };

  return (
    <button
      {...props}
      className={`
        whitespace-nowrap
        text-center
        font-normal
        capitalize
        shadow-sm
        disabled:pointer-events-none        
        disabled:opacity-50 
        ${getSize(size)} ${getType(buttonType)}
      `}
      disabled={disabled}
    >
      {children}
      {buttonType === 'dropdown' && <span className="icon-[lucide--chevron-down]"></span>}
    </button>
  );
}

export default Button;
