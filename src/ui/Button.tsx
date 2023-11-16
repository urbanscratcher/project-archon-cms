import { ReactElement, ReactNode } from 'react';

export enum ButtonSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  WARN = 'warn',
}

interface ButtonProps {
  size?: ButtonSize;
  type?: string;
  disabled: boolean;
  children: ReactNode;
}

function Button({
  size = ButtonSize.MEDIUM,
  type = ButtonType.PRIMARY,
  disabled,
  children,
}: ButtonProps): ReactElement {
  const getSize = (size: string): string => {
    switch (size) {
      case ButtonSize.SMALL:
        return 'px-2 py-3 text-lg font-semibold';
      case ButtonSize.MEDIUM:
        return 'px-5 py-7 text-xl font-medium';
      case ButtonSize.LARGE:
        return 'px-5 py-10 text-2xl font-medium';
      default:
        return '';
    }
  };
  const getType = (size: string): string => {
    switch (size) {
      case ButtonType.PRIMARY:
        return 'bg-navy-600 text-navy-50 hover:bg-navy-700 border-none';
      case ButtonType.SECONDARY:
        return 'border border-solid border-ghost-300 bg-white text-ghost-600 hover:bg-ghost-50';
      case ButtonType.WARN:
        return 'bg-red-700 text-red-100 hover:bg-red-800 border-none';
      default:
        return '';
    }
  };

  return (
    <button
      className={`rounded-lg text-center uppercase shadow-sm disabled:bg-ghost-600 ${getSize(size)} ${getType(type)}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
