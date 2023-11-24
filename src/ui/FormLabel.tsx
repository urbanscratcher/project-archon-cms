import { PropsWithChildren, ReactElement } from 'react';

export function FormLabel({ children }: PropsWithChildren): ReactElement {
  return <label className="font-medium">{children}</label>;
}
