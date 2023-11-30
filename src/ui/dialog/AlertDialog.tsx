import { PropsWithChildren, useEffect, useState } from 'react';
import Button from '../button/Button';
import Dialog from './Dialog';

type AlertDialogProps = {
  title: string;
  description: string;
  continueLabel?: string;
  onContinue: () => void;
  cancelLabel?: string;
  onCancel: () => void;
};

AlertDialog.Footer = function Footer({ children }: PropsWithChildren) {
  return <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{children}</div>;
};

AlertDialog.Cancel = function Cancel({ children, onClickCancel }: PropsWithChildren & { onClickCancel: () => void }) {
  return (
    <Button
      size="sm"
      buttonType="muted"
      onClick={onClickCancel}
    >
      {children}
    </Button>
  );
};

AlertDialog.Action = function Action({ children, onClickAction }: PropsWithChildren & { onClickAction: () => void }) {
  return (
    <Button
      size="sm"
      buttonType="primary"
      onClick={onClickAction}
    >
      {children}
    </Button>
  );
};

function AlertDialog({
  title,
  description,
  onContinue,
  continueLabel,
  onCancel,
  cancelLabel,
  children,
}: AlertDialogProps & PropsWithChildren) {
  const [show, setShow] = useState(true);
  if (!show) return null;

  const onClickCancel = () => {
    console.log(closed);
    onCancel();
    setShow(false);
  };

  const onClickAction = () => {
    onContinue();
    setShow(false);
  };

  return (
    <>
      {!closed && (
        <Dialog.Portal>
          <Dialog.Background />
          <Dialog.Box>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description>{description}</Dialog.Description>
            </Dialog.Header>
            {children}
            <AlertDialog.Footer>
              <AlertDialog.Cancel onClickCancel={onClickCancel}>{cancelLabel ?? 'Cancel'}</AlertDialog.Cancel>
              <AlertDialog.Action onClickAction={onClickAction}>{continueLabel ?? 'Continue'}</AlertDialog.Action>
            </AlertDialog.Footer>
          </Dialog.Box>
        </Dialog.Portal>
      )}
    </>
  );
}

export default AlertDialog;
