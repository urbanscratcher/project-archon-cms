import { ReactNode } from 'react';
import { Error, Label } from './FormRowVertical';

type FormRowHorizontalProps = {
  label?: string;
  error?: string;
  children: ReactNode;
};

function FormRowHorizontal({ label, error, children }: FormRowHorizontalProps) {
  return (
    <div className="flex gap-2">
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </div>
  );
}

export default FormRowHorizontal;
