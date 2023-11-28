import { PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../button/Button';

type DialogProps = {
  title: string;
  description: string;
  actionName: string;
  onAction: (e) => void;
};

export function DialogBackground() {
  return <div className="min-w-screen absolute z-40 min-h-screen w-full bg-zinc-50/30 backdrop-blur-md"></div>;
}

export function DialogBox({ children }: PropsWithChildren) {
  return (
    <div
      role="alertdialog"
      className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border  border-zinc-300 bg-white p-6 shadow-lg duration-200"
    >
      {children}
    </div>
  );
}

export function DialogHeader({ children }: PropsWithChildren) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-2 text-center sm:text-left"
    >
      {children}
    </div>
  );
}

export function DialogTitle({ children }: PropsWithChildren) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function DialogDescription({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

function DialogFooter({ children }: PropsWithChildren) {
  return <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{children}</div>;
}

function DialogAction({ children, onClickAction }: PropsWithChildren & { onClickAction: (e) => void }) {
  return (
    <Button
      size="sm"
      buttonType="primary"
      onClick={onClickAction}
    >
      {children}
    </Button>
  );
}

export function DialogPortal({ children }: PropsWithChildren) {
  return createPortal(children, document.getElementById('portal') as HTMLElement);
}

function Dialog({ title, description, actionName, onAction, children }: PropsWithChildren & DialogProps) {
  const [show, setShow] = useState(true);
  if (!show) return null;

  const onClickAction = (e) => {
    onAction(e);
    setShow(false);
  };

  return (
    <>
      <DialogPortal>
        <DialogBackground />
        <DialogBox>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>
            <DialogAction onClickAction={(e) => onClickAction(e)}>{actionName}</DialogAction>
          </DialogFooter>
        </DialogBox>
      </DialogPortal>
    </>
  );
}

export default Dialog;
