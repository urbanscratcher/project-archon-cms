import Table from '../../ui/Table';
import userColumnDefs from './userColumnDefs';

function UserTableHead() {
  return (
    <Table.Head>
      <Table.HeadRow>
        {userColumnDefs.map((def) => (
          <Table.HeadCell key={def.head}>{def.head}</Table.HeadCell>
        ))}
      </Table.HeadRow>
    </Table.Head>
  );
}

export default UserTableHead;
