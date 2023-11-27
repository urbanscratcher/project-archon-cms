type SpinnerProps = {
  light?: boolean;
};

function Spinner({ light = false }: SpinnerProps) {
  return (
    <div
      className={`
        inline-flex
        max-h-5
        items-center
        justify-center gap-2
        ${light ? 'text-navy-50/85' : 'text-zinc-500/80'}
      `}
    >
      <div
        className="
          h-4 w-4
          animate-spin
          rounded-full
          border-[2px]
          border-current
          border-t-transparent
          dark:text-white
        "
        role="status"
        aria-label="loading"
      ></div>
      <p>Loading...</p>
    </div>
  );
}

export default Spinner;
