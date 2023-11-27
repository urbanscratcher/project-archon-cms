// inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80

type BadgeProps = {
  text: string;
};

function Badge({ text }: BadgeProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-zinc-600 px-2.5 py-0.5 text-sm transition-colors focus:outline-none">
      {text}
    </div>
  );
}

export default Badge;
