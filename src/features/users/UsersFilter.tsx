import { PropsWithChildren } from 'react';
import InputAction from '../../ui/InputAction';
import DropdownAction from '../../ui/DropdownAction';
import { useUserFilterStore } from './usersStore';

function UsersFilter() {
  const { setSearchFilter, roleOptions, selectedRoles, selectRole, unselectRole } = useUserFilterStore();

  return (
    <>
      <UsersFilter.Container>
        <InputAction
          placeholder="Search a name or email..."
          setAction={setSearchFilter}
        />
        <DropdownAction
          buttonText="Filter by Role"
          options={roleOptions}
          selectedOptions={selectedRoles}
          selectOption={selectRole}
          unselectOption={unselectRole}
        />
      </UsersFilter.Container>
    </>
  );
}

export default UsersFilter;

UsersFilter.Container = function Container({ children }: PropsWithChildren) {
  return <div className="flex flex-wrap items-center justify-between gap-1">{children}</div>;
};
