import { ReactElement, ReactNode } from 'react';

type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  children: ReactNode;
};

function Button({ size = 'md', type = 'primary', disabled = false, children }: ButtonProps): ReactElement {
  const getSize = (size: string): string => {
    switch (size) {
      case 'sm':
        return 'px-2 py-2 text-sm';
      case 'md':
        return 'px-3 py-3 text-md';
      case 'lg':
        return 'px-5 py-10 text-lg';
      default:
        return '';
    }
  };
  const getType = (type: string): string => {
    switch (type) {
      case 'primary':
        return 'bg-navy-700 text-navy-50 hover:bg-navy-600 border-none';
      case 'secondary':
        return 'border border-solid border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-50';
      default:
        return '';
    }
  };

  return (
    <button
      className={`
        rounded-lg
        text-center
        font-normal
        capitalize
        shadow-sm
        disabled:pointer-events-none        
        disabled:opacity-50 
        ${getSize(size)} ${getType(type)}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
