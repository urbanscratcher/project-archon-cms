import { PropsWithChildren, useState } from 'react';
import Button from '../button/Button';
import { DialogBackground, DialogBox, DialogDescription, DialogHeader, DialogPortal, DialogTitle } from './Dialog';

type AlertDialogProps = {
  title: string;
  description: string;
  onContinue: () => void;
  onCancel: () => void;
};

export function AlertDialogFooter({ children }: PropsWithChildren) {
  return <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{children}</div>;
}

export function AlertDialogCancel({ children, onClickCancel }: PropsWithChildren & { onClickCancel: () => void }) {
  return (
    <Button
      size="sm"
      buttonType="muted"
      onClick={onClickCancel}
    >
      {children}
    </Button>
  );
}

export function AlertDialogAction({ children, onClickAction }: PropsWithChildren & { onClickAction: () => void }) {
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

function AlertDialog({ title, description, onContinue, onCancel, children }: AlertDialogProps & PropsWithChildren) {
  console.log('Rendering...');

  const [show, setShow] = useState(true);
  if (!show) return null;

  const onClickCancel = () => {
    onCancel();
    setShow(false);
  };

  const onClickAction = () => {
    onContinue();
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
          <AlertDialogFooter>
            <AlertDialogCancel onClickCancel={onClickCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClickAction={onClickAction}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </DialogBox>
      </DialogPortal>
    </>
  );
}

export default AlertDialog;
