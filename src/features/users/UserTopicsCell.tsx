import Badge from '../../ui/Badge';

type UserTopicsCellProps = {
  topics?: any[];
};

function UserTopicsCell({ topics }: UserTopicsCellProps) {
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

export default UserTopicsCell;
