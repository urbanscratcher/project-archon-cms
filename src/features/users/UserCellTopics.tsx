import Badge from '../../ui/Badge';

type UserCellTopicsProps = {
  topics?: any[];
};

function UserCellTopics({ topics }: UserCellTopicsProps) {
  if (!topics) return;

  return (
    <div className="flex flex-nowrap gap-[0.1rem] xl:flex-wrap">
      {topics.map((t) => (
        <Badge
          key={t.name + Math.floor(Math.random() * 100)}
          text={t.name}
        />
      ))}
    </div>
  );
}

export default UserCellTopics;
