import { PropsWithChildren } from 'react';

function InsightsFilter({ children }: PropsWithChildren) {
  return <div className="flex flex-wrap items-center justify-between gap-1">{children}</div>;
}

export default InsightsFilter;
