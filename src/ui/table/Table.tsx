import { type PropsWithChildren } from 'react';

function Table({ children }: PropsWithChildren) {
  return <table className="w-full caption-bottom">{children}</table>;
}

export default Table;
