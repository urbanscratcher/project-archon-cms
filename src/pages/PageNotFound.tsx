import Logo from '../ui/Logo';

function PageNotFound() {
  return (
    <>
      <section className="mx-auto my-auto flex h-fit w-fit translate-y-[40vh] items-center tracking-tight text-zinc-600">
        <header className="w-fit px-5 py-1 grayscale">
          <Logo />
        </header>
        <div
          role="presentation"
          className="flex flex-col gap-2 border-l border-l-zinc-300 px-5 py-1"
        >
          <h3 className="">404 Page Not Found</h3>
          <p className="grid-col-[3/4]">The requested URL was not found on this server</p>
        </div>
      </section>
    </>
  );
}

export default PageNotFound;
