type MainHeaderProps = {
  title: string;
  desc?: string;
};

function MainHeader({ title, desc }: MainHeaderProps) {
  return (
    <div>
      <h2 className="capitalize">{title}</h2>
      {desc && <p className="text-zinc-500">{desc}</p>}
    </div>
  );
}

export default MainHeader;
