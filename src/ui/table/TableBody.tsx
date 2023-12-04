import { ColumnDef } from '../../utils/types';
import Table from './Table';

type TableBodyProps<T> = {
  data: any;
  columnDefs: ColumnDef<T>[];
  simple?: boolean;
};

function TableBody<T>({ data, columnDefs, simple = false }: TableBodyProps<T>) {
  if (simple)
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell
            colSpan={columnDefs.length}
            className="py-3 text-center"
          >
            {data}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );

  return (
    <Table.Body>
      {data.data.map((row: any) => (
        <Table.Row key={row.idx}>
          {columnDefs.map((def) => (
            <Table.Cell key={`${def.head}_${row.idx}`}>{def.displayFn(row)}</Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  );
}

export default TableBody;
