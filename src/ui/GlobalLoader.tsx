import Spinner from './Spinner';

function GlobalLoader() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-2 text-center">
      <Spinner />
    </div>
  );
}

export default GlobalLoader;
