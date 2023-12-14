import { useUserFilterStore } from './usersStore';
import Pagination from '../../ui/Pagination';

function UsersPagination() {
  const { limit, setLimit, offset, setOffset, total } = useUserFilterStore();

  return (
    <div className="flex justify-between">
      <p className=" text-zinc-500">Total {total}</p>
      <Pagination
        onSetLimit={setLimit}
        onSetOffset={setOffset}
        limit={limit}
        offset={offset}
        total={total}
      />
    </div>
  );
}

export default UsersPagination;
