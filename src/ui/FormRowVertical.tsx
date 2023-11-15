import { ReactElement, ReactNode } from 'react';
import { WrapperProps } from '../utils/interfaces';

interface FormRowVerticalProps {
  label?: string;
  error?: string;
  children: ReactNode;
}

function FormRowVertical({ label, error, children }: FormRowVerticalProps): ReactNode {
  return (
    <div className="flex flex-col gap-3 py-5">
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </div>
  );
}

function Error({ children }: WrapperProps): ReactElement {
  return <span className="text-2xl text-red-700">{children}</span>;
}

function Label({ children }: WrapperProps): ReactElement {
  return <label className="font-medium">{children}</label>;
}

export default FormRowVertical;
