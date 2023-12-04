import { type PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { useMoveBack } from '../hooks/useMoveBack';
import Logo from '../ui/Logo';
import Button from '../ui/button/Button';
import PageNotFound from './PageNotFound';
import { AxiosError } from 'axios';

function Error() {
  const location = useLocation();
  const errorState = location.state as { message: string; status: number };

  return errorState ? (
    <section className="mx-auto my-auto grid h-fit w-fit translate-y-[40vh]">
      <Error.Container>
        <Error.Header>
          <Logo />
        </Error.Header>
        <Error.Message errorState={errorState}></Error.Message>
        <Error.Retry />
      </Error.Container>
    </section>
  ) : (
    <PageNotFound />
  );
}

Error.Container = function Container({ children }: PropsWithChildren) {
  return (
    <div className="grid-cols-[auto_auto] grid-rows-[auto_auto] items-center gap-2 px-2 tracking-tight text-zinc-600">
      {children}
    </div>
  );
};

Error.Retry = function Retry() {
  const moveBack = useMoveBack();
  return (
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
  );
};

Error.Header = function Header({ children }: PropsWithChildren) {
  return <header className="w-fit border-r border-r-zinc-300 px-5 py-1 grayscale">{children}</header>;
};

export const makeErrorMsg = (status: number) => {
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

Error.Message = function Message({ children, errorState }: PropsWithChildren & { errorState?: any }) {
  if (errorState instanceof AxiosError) {
    errorState.status = errorState.response?.status;
  }

  return (
    <div
      role="presentation"
      className="flex flex-col gap-2 px-5 py-1"
    >
      {children}
      {errorState && <h3>{makeErrorMsg(errorState.status).title}</h3>}
      {errorState?.message && <p className="grid-col-[3/4]">{makeErrorMsg(errorState.status).description}</p>}
    </div>
  );
};

export default Error;
