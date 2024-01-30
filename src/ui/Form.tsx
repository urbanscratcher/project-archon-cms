import { ComponentPropsWithoutRef, PropsWithChildren, type ReactNode } from 'react';

type FormRowProps = {
  label?: string;
  error?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

type FormProps = {
  borderless?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<'form'>;

export default function Form({ borderless, children, ...otherProps }: FormProps) {
  return (
    <form
      className={
        `overflow-hidden rounded-xl px-7 py-8 shadow-sm` + `${borderless ? '' : 'border border-solid border-zinc-200'}`
      }
      {...otherProps}
    >
      {children}
    </form>
  );
}

Form.Label = function Label({ children }: PropsWithChildren) {
  return <label className="flex font-medium">{children}</label>;
};

Form.RowVertical = function RowVertical({ label, error, children, ...otherProps }: FormRowProps) {
  return (
    <div
      className="w-full gap-2 py-3"
      {...otherProps}
    >
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

Form.RowHorizontal = function RowHorizontal({ label, error, children, ...otherProps }: FormRowProps) {
  return (
    <div
      className="flex gap-2"
      {...otherProps}
    >
      {label && <Form.Label>{label}</Form.Label>}
      {children}
    </div>
  );
};
