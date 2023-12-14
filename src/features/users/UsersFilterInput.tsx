import SearchFilter from '../../ui/SearchFilter';
import { useUserFilterStore } from './usersStore';

function UsersFilterInput() {
  const { setSearchFilter, searchFilter } = useUserFilterStore();

  return (
    <SearchFilter
      placeholder="Search a name or email..."
      onSetSearchFilter={setSearchFilter}
      searchFilter={searchFilter}
    />
  );
}

export default UsersFilterInput;
