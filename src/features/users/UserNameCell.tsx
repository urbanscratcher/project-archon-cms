import { Avatar } from '../../ui/Profile';

type UserNameCellProps = {
  avatar?: string;
  firstName: string;
  lastName: string;
};

function UserNameCell({ avatar, firstName, lastName }: UserNameCellProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="aspect-square w-8 overflow-clip rounded-full">
        <Avatar url={avatar} />
      </div>
      <p className="whitespace-nowrap">
        {firstName} {lastName}
      </p>
    </div>
  );
}

export default UserNameCell;
