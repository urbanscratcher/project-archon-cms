import Logo from '../ui/Logo';

function PageNotFound() {
  //

  return (
    <main className="mx-auto my-auto grid h-fit w-fit translate-y-[40vh] grid-cols-[auto_auto_auto] grid-rows-[auto_auto] items-center gap-2 tracking-tight text-zinc-600">
      <header className="row-span-full w-fit px-5 grayscale">
        <Logo />
      </header>
      <hr className="row-span-full mr-6 h-full w-[1px] bg-zinc-300" />
      <h3 role="presentation">404 Page Not Found</h3>
      <p role="presentation">The requested URL was not found on this server</p>
    </main>
  );
}

export default PageNotFound;
