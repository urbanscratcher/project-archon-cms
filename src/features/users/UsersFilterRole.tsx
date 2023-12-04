import DropdownAction from '../../ui/dropdown/DropdownAction';
import { useUserFilterStore } from './usersStore';

function UsersFilterRole() {
  const { roleOptions, selectedRoles, selectRole, unselectRole } = useUserFilterStore();
  return (
    <DropdownAction
      buttonText="Filter by Role"
      options={roleOptions}
      selectedOptions={selectedRoles}
      onSelect={selectRole}
      onUnselect={unselectRole}
    />
  );
}

export default UsersFilterRole;
