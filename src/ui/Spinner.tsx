import { PropsWithChildren } from 'react';

type SpinnerProps = {
  light?: boolean;
  withText?: boolean;
};

function Spinner({ light = false, withText = true }: SpinnerProps) {
  return (
    <Spinner.Container light={light}>
      <Spinner.AnimatedIcon />
      {withText ? <p>Loading...</p> : null}
    </Spinner.Container>
  );
}

export default Spinner;

Spinner.Container = function Container({ children, light }: PropsWithChildren & { light?: boolean }) {
  return (
    <div
      className={`flex h-[26px] items-center justify-center gap-2 ${light ? 'text-navy-50/85' : 'text-zinc-500/80'}
  `}
    >
      {children}
    </div>
  );
};

Spinner.AnimatedIcon = function AnimatedIcon() {
  return (
    <span
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
    ></span>
  );
};
