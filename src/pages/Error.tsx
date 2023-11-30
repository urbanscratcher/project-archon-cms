import { useLocation } from 'react-router-dom';
import { useMoveBack } from '../hooks/useMoveBack';
import Logo from '../ui/Logo';
import Button from '../ui/button/Button';
import PageNotFound from './PageNotFound';

function Error() {
  const moveBack = useMoveBack();

  const location = useLocation();
  const errorState = location.state as { message: string; status: number };

  const msg = (status: number) => {
    switch (status) {
      case 401:
        return { title: 'Unauthenticated', description: 'Please retry or sign up to be authenticated' };
      case 404:
        return { title: 'Not found', description: 'Please go back and retry' };
      case 409:
        return { title: 'Conflict', description: 'You entered duplicated resource, please retry with new one' };
      case 429:
        return { title: 'Too many requests', description: 'Too many request from this IP, please retry in an hour' };
      default:
        return { title: 'Something went wrong', description: 'Please go back and retry' };
    }
  };

  return errorState ? (
    <section className="mx-auto my-auto grid h-fit w-fit translate-y-[40vh] grid-cols-[auto_auto] grid-rows-[auto_auto] items-center gap-2 px-2 tracking-tight text-zinc-600">
      <header className="w-fit px-5 py-1 grayscale">
        <Logo />
      </header>
      <div
        role="presentation"
        className="flex flex-col gap-2 border-l border-l-zinc-300 px-5 py-1"
      >
        {errorState && <h3>{msg(errorState.status).title}</h3>}
        {errorState?.message && <p className="grid-col-[3/4]">{msg(errorState.status).description}</p>}
      </div>
      <div className="col-span-full w-max justify-self-center">
        <Button
          buttonType="borderless"
          size="md"
          onClick={() => moveBack()}
        >
          <span className="icon-[lucide--rotate-ccw]"></span>
          &nbsp;&nbsp;Retry
        </Button>
      </div>
    </section>
  ) : (
    <PageNotFound />
  );
}

export default Error;
