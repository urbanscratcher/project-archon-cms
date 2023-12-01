import { PropsWithChildren } from 'react';
import Table from './Table';

export function TableBodyFull({ children }: PropsWithChildren) {
  return (
    <Table.Body>
      <Table.Row>
        <Table.CellFull>{children}</Table.CellFull>
      </Table.Row>
    </Table.Body>
  );
}
