type BadgeProps = {
  text: string;
};

function Badge({ text }: BadgeProps) {
  return (
    <div className="inline-flex w-max items-center rounded-md border border-zinc-300 px-2.5 py-0.5 text-sm font-medium capitalize transition-colors focus:outline-none">
      {text}
    </div>
  );
}

export default Badge;
