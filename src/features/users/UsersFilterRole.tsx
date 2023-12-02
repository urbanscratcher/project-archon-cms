import DropdownAction from '../../ui/DropdownAction';
import { useUserFilterStore } from './usersStore';

function UsersFilterRole() {
  const { roleOptions, selectedRoles, selectRole, unselectRole } = useUserFilterStore();
  return (
    <DropdownAction
      buttonText="Filter by Role"
      options={roleOptions}
      selectedOptions={selectedRoles}
      selectOption={selectRole}
      unselectOption={unselectRole}
    />
  );
}

export default UsersFilterRole;
