type BadgeProps = {
  text: string;
};

function Badge({ text }: BadgeProps) {
  return (
    <div className="inline-flex items-center rounded-md border border-zinc-300 px-2.5 py-0.5 text-sm capitalize tracking-tight transition-colors focus:outline-none">
      {text}
    </div>
  );
}

export default Badge;
