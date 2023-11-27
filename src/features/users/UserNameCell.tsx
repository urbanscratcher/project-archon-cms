type UserNameCellProps = {
  avatar?: string;
  firstName: string;
  lastName: string;
};

function UserNameCell({ avatar, firstName, lastName }: UserNameCellProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="aspect-square w-8 overflow-clip rounded-full">
        {avatar ? (
          <img
            className="w-full object-cover"
            src={avatar}
            alt="avatar"
          />
        ) : (
          <span className="icon-[lucide--user-circle] h-full w-full text-zinc-300">&nbsp;</span>
        )}
      </div>
      <p className="whitespace-nowrap">
        {firstName} {lastName}
      </p>
    </div>
  );
}

export default UserNameCell;
