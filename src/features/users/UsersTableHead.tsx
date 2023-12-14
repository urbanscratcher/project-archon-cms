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
          className={def.style}
        >
          {def?.sortKey ? (
            <SortableColumnBtn
              def={def}
              sorts={sorts}
              onAddSorts={addSorts}
              onRemoveSorts={removeSorts}
            />
          ) : (
            <p className="pl-2">{def.head}</p>
          )}
        </Table.HeadCell>
      ))}
    </>
  );
}

export default UsersTableHead;
