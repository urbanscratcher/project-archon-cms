import { PropsWithChildren } from 'react';

function InsightsFilter({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-[auto_max-content_max-content] gap-5">{children}</div>;
}

export default InsightsFilter;
