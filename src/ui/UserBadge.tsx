import { Avatar } from './Avatar';

type UserCellNameProps = {
  avatar?: string;
  firstName: string;
  lastName: string;
};

function UserCellName({ avatar, firstName, lastName }: UserCellNameProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="aspect-square w-8 overflow-clip rounded-full">
        <Avatar src={avatar} />
      </div>
      <p className="whitespace-nowrap">
        {firstName} {lastName}
      </p>
    </div>
  );
}

export default UserCellName;
