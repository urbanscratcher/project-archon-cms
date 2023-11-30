type SpinnerProps = {
  light?: boolean;
  withText?: boolean;
};

function Spinner({ light = false, withText = true }: SpinnerProps) {
  return (
    <div
      className={`
        h-inherit
        flex
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
      {withText ? <p>Loading...</p> : null}
    </div>
  );
}

export default Spinner;
