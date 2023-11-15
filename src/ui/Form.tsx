import { ReactElement, ReactNode } from 'react';

export enum FormType {
  REGULAR = 'regular',
  MODAL = 'modal',
}

interface FormProps {
  type?: FormType;
  children: ReactNode;
}

function Form({ type = FormType.REGULAR, children }: FormProps): ReactElement {
  if (type) {
    ('');
  }

  return (
    <form
      className={`overflow-hidden rounded-xl border border-solid border-ghost-100 bg-ghost-50 px-10 py-16 text-2xl`}
    >
      {children}
    </form>
  );
}

export default Form;
