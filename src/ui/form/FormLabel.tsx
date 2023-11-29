import { PropsWithChildren, ReactElement } from 'react';

export function FormLabel({ children }: PropsWithChildren): ReactElement {
  return <label className="flex justify-between font-medium">{children}</label>;
}
