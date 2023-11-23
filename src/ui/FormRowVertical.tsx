import { PropsWithChildren, ReactElement, ReactNode } from 'react';

type FormRowVerticalProps = {
  label?: string;
  error?: string;
  children: ReactNode;
};

function FormRowVertical({ label, error, children }: FormRowVerticalProps): ReactNode {
  return (
    <div className="flex flex-col gap-2 py-4">
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </div>
  );
}

function Error({ children }: PropsWithChildren): ReactElement {
  return <span className="text-2xl text-red-700">{children}</span>;
}

function Label({ children }: PropsWithChildren): ReactElement {
  return <label className="font-medium">{children}</label>;
}

export default FormRowVertical;
