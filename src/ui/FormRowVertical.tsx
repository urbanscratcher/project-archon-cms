import { type ReactNode } from 'react';
import Error from './Error';
import { FormLabel } from './FormLabel';

type FormRowProps = {
  label?: string;
  error?: string;
  children: ReactNode;
};

export function FormRowVertical({ label, error, children }: FormRowProps) {
  return (
    <div className="flex flex-col gap-2 py-3">
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {error && <Error>{error}</Error>}
    </div>
  );
}

export function FormRowHorizontal({ label, error, children }: FormRowProps) {
  return (
    <div className="flex gap-2">
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {error && <Error>{error}</Error>}
    </div>
  );
}
