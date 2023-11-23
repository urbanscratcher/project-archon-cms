import { type FormEventHandler, ReactElement, ReactNode } from 'react';

export enum FormType {
  REGULAR = 'regular',
  MODAL = 'modal',
}

type FormProps = {
  type?: FormType;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

function Form({ type = FormType.REGULAR, onSubmit, children }: FormProps): ReactElement {
  if (type) {
    ('');
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`overflow-hidden rounded-xl border border-solid border-zinc-200 px-7 py-8 shadow-sm`}
    >
      {children}
    </form>
  );
}

export default Form;
