import { useUserFilterStore } from './usersStore';
import Pagination from '../../ui/Pagination';

function UsersPagination() {
  const { limit, setLimit, offset, setOffset, total } = useUserFilterStore();

  return (
    <Pagination
      onSetLimit={setLimit}
      onSetOffset={setOffset}
      limit={limit}
      offset={offset}
      total={total}
    />
  );
}

export default UsersPagination;
