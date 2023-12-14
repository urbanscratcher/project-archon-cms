import SortableColumnBtn from '../../ui/button/SortableColumnBtn';
import Table from '../../ui/table/Table';
import userColumnDefs from './userColumnDefs';
import { useUserFilterStore } from './usersStore';

function UsersTableHead() {
  const { sorts, addSorts, removeSorts } = useUserFilterStore();

  return (
    <>
      {userColumnDefs.map((def) => (
        <Table.HeadCell
          key={def.head}
          style={def.style}
        >
          {def?.sortKey ? (
            <SortableColumnBtn
              def={def}
              sorts={sorts}
              onAddSorts={addSorts}
              onRemoveSorts={removeSorts}
            />
          ) : (
            def.head
          )}
        </Table.HeadCell>
      ))}
    </>
  );
}

export default UsersTableHead;
