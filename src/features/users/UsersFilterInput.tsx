import InputAction from '../../ui/InputAction';
import { useUserFilterStore } from './usersStore';

function UsersFilterInput() {
  const { setSearchFilter } = useUserFilterStore();

  return (
    <InputAction
      placeholder="Search a name or email..."
      setAction={setSearchFilter}
    />
  );
}

export default UsersFilterInput;
