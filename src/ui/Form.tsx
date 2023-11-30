import { ComponentPropsWithoutRef, PropsWithChildren, type ReactNode } from 'react';

type FormRowProps = {
  label?: string;
  error?: string;
  children: ReactNode;
};

export default function Form({ children, ...otherProps }: ComponentPropsWithoutRef<'form'>) {
  return (
    <form
      className={`overflow-hidden rounded-xl border border-solid border-zinc-200 px-7 py-8 shadow-sm `}
      {...otherProps}
    >
      {children}
    </form>
  );
}

Form.Label = function Label({ children }: PropsWithChildren) {
  return <label className="flex font-medium">{children}</label>;
};

Form.RowVertical = function RowVertical({ label, error, children }: FormRowProps) {
  return (
    <div className="w-full gap-2 py-3">
      {label && (
        <Form.Label>
          {label}
          {error ? (
            error === 'Required' ? (
              <span className={`text-sm text-navy-600`}>*</span>
            ) : (
              <span className={`ml-auto mr-1 self-center text-sm text-navy-600`}>{error}</span>
            )
          ) : null}
        </Form.Label>
      )}
      {children}
    </div>
  );
};

Form.RowHorizontal = function RowHorizontal({ label, error, children }: FormRowProps) {
  return (
    <div className="flex gap-2">
      {label && <Form.Label>{label}</Form.Label>}
      {children}
    </div>
  );
};
