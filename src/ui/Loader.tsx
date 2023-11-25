function Loader() {
  return (
    <div
      className="

      inline-flex
      h-6
      w-6
      animate-spin
      items-center justify-center
      rounded-full border-[3px] border-current
      border-t-transparent
      opacity-70 dark:text-white"
      role="status"
      aria-label="loading"
    >
      &nbsp;
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
