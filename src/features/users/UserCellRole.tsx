import { useCallback, useState } from 'react';
import { Role } from '../../models/Users';
import Error from '../../pages/Error';
import DropdownAction from '../../ui/dropdown/DropdownAction';
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
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([userRole]);
  const [tempRole, setTempRole] = useState<Role | undefined>(undefined);
  const [alert, setAlert] = useState(false);

  const { mutate, isPending, error } = useUpdateRole();
  if (error) return <Error />;

  const selectHandler = useCallback(
    (role: Role) => {
      if (role === selectedRoles[0]) return;
      setTempRole(role);
      setAlert(!alert);
    },
    [selectedRoles],
  );

  const unselectHandler = useCallback(
    (role: Role) => {
      if (role === selectedRoles[0]) return;
      setSelectedRoles(roleOptions.filter((r: Role) => r !== role));
    },
    [selectedRoles, roleOptions],
  );

  const continueHandler = useCallback(() => {
    if (tempRole) {
      mutate({ idx: idx, body: { role: tempRole } });
      setSelectedRoles([tempRole]);
      setAlert(false);
    }
  }, [mutate, tempRole, tempRole]);

  const cancelHandler = useCallback(() => {
    setTempRole(undefined);
    setAlert(false);
  }, []);

  return (
    <>
      {alert ? (
        <AlertDialog
          title={'Are you sure to update?'}
          description={'It changes the authorization scope of the user'}
          onContinue={continueHandler}
          onCancel={cancelHandler}
        />
      ) : null}
      <DropdownAction
        options={roleOptions}
        selectedOptions={selectedRoles}
        onSelect={selectHandler}
        onUnselect={unselectHandler}
        closedAfterSelect={true}
      >
        {isPending ? (
          <div className="flex items-center py-1">
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
