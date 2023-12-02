import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Role } from '../../models/Users';
import Error from '../../pages/Error';
import DropdownAction from '../../ui/DropdownAction';
import Spinner from '../../ui/Spinner';
import AlertDialog from '../../ui/dialog/AlertDialog';
import useUpdateRole from './useUpdateRole';

type UserCellRoleProps = {
  idx: number;
  userRole: Role;
  options: string[];
};

export const roleOptions: Role[] = ['user', 'admin', 'editor', 'writer'];

function UserCellRole({ idx, userRole }: UserCellRoleProps) {
  const queryClient = useQueryClient();
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([userRole]);
  const [tempRole, setTempRole] = useState<Role>(userRole);
  const [alert, setAlert] = useState(false);

  const { mutate, isPending, error } = useUpdateRole();
  if (error) return <Error />;

  const selectRole = useCallback(
    (role: Role) => {
      if (role === selectedRoles[0]) return;
      setTempRole(role);
      setAlert(!alert);
    },
    [selectedRoles],
  );

  const unselectRole = useCallback(
    (role: Role) => {
      if (role === selectedRoles[0]) return;
      setSelectedRoles(roleOptions.filter((r: Role) => r !== role));
    },
    [selectedRoles, roleOptions],
  );

  const onContinue = useCallback(() => {
    mutate({ idx: idx, body: { role: selectedRoles[0] } });
    queryClient.invalidateQueries({ queryKey: ['users'] });
    setSelectedRoles([tempRole]);
    setAlert(false);
  }, [mutate, queryClient.invalidateQueries, tempRole, selectedRoles]);

  const onCancel = useCallback(() => {
    setAlert(false);
  }, []);

  return (
    <>
      {alert ? (
        <AlertDialog
          title={'Are you sure to update?'}
          description={'It changes your data'}
          onContinue={onContinue}
          onCancel={onCancel}
        />
      ) : null}
      <DropdownAction
        options={roleOptions}
        selectedOptions={selectedRoles}
        selectOption={selectRole}
        unselectOption={unselectRole}
        closedAfterSelect={true}
      >
        {isPending ? (
          <div className="py-1">
            <Spinner withText={false} />
          </div>
        ) : (
          selectedRoles[0]
        )}
      </DropdownAction>
    </>
  );
}

export default UserCellRole;
