import {
  type PropsWithChildren,
  useCallback,
  useState,
  type MouseEvent,
  type SyntheticEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import Button from '../button/Button';
import Spinner from '../Spinner';

type DialogProps = {
  title: string;
  description: string;
  actionName: ReactNode;
  onAction: (e: SyntheticEvent) => void;
  isLoading?: boolean;
};

Dialog.Background = function Background() {
  return <div className="fixed z-40 min-h-screen w-screen bg-zinc-50/30 backdrop-blur-md"></div>;
};

Dialog.Box = function Box({ children }: PropsWithChildren) {
  return (
    <div
      role="alertdialog"
      className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border  border-zinc-300 bg-white p-6 shadow-lg duration-200 dark:border-zinc-700 dark:bg-zinc-900"
    >
      {children}
    </div>
  );
};

Dialog.Header = function Header({ children }: PropsWithChildren) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-2 text-center sm:text-left"
    >
      {children}
    </div>
  );
};

Dialog.Title = function Title({ children }: PropsWithChildren) {
  return <h2 className="text-lg font-semibold dark:text-zinc-200">{children}</h2>;
};

Dialog.Description = function Description({ children }: PropsWithChildren) {
  return <div className="dark:text-zinc-400">{children}</div>;
};
Dialog.Footer = function Footer({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col-reverse gap-2 sm:w-fit sm:flex-row sm:justify-end sm:justify-self-end">
      {children}
    </div>
  );
};

Dialog.Action = function Action({
  children,
  onClickAction,
  isLoading,
}: PropsWithChildren & { onClickAction: (e: MouseEvent) => void; isLoading?: boolean }) {
  return (
    <Button
      size="sm"
      buttonType="primary"
      disabled={isLoading}
      onClick={onClickAction}
    >
      {children}
    </Button>
  );
};

Dialog.Portal = function Portal({ children }: PropsWithChildren) {
  return createPortal(children, document.getElementById('portal') as HTMLElement);
};

function Dialog({ title, description, actionName, onAction, children, isLoading }: PropsWithChildren & DialogProps) {
  const [show, setShow] = useState(true);

  // used useCallback since it is passed down to a child component
  const onClickAction = useCallback(
    (e: MouseEvent) => {
      onAction(e);
      setShow(false);
    },
    [onAction],
  );

  return (
    <>
      <Dialog.Portal>
        <Dialog.Background />
        <Dialog.Box>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
          </Dialog.Header>
          {children}
          <Dialog.Footer>
            <Dialog.Action
              isLoading={isLoading}
              onClickAction={onClickAction}
            >
              {isLoading ? (
                <Spinner
                  light
                  withText={false}
                />
              ) : (
                actionName
              )}
            </Dialog.Action>
          </Dialog.Footer>
        </Dialog.Box>
      </Dialog.Portal>
    </>
  );
}

export default Dialog;
